import {FlatList, ScrollView, View} from 'react-native';
import {useMedia, useComment} from '../hooks/ApiHooks';
import SoldListItem from './SoldListItem';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {createInstrumentArray} from '../utils/functions.js';
import styles from '../styles/Styles';

const SoldList = ({navigation}) => {
  const {update} = useContext(MainContext);
  const {user} = useContext(MainContext);
  const {mediaArray} = useMedia(update);
  const {loadComments, commentsArray} = useComment();
  const [commentsFetched, setCommentsFetched] = useState(false);

  // mediaArray -> instrumentArray
  const instrumentArray = createInstrumentArray(mediaArray);

  const userItemsArray = instrumentArray.filter(
    (item) => item.user_id === user.user_id,
  );

  const fileIdArray = userItemsArray.map((item) => item.file_id);

  const fetchComments = async () => {
    try {
      if (!commentsFetched && fileIdArray.length > 0) {
        const loadCommentsPromises = fileIdArray.map(async (file_id) => {
          await loadComments(file_id);
        });

        await Promise.all(loadCommentsPromises);

        setCommentsFetched(true);
      }
    } catch (error) {
      console.error('fetchComments', error);
    }
  };

  useEffect(() => {
    if (fileIdArray.length > 0) {
      fetchComments();
    }
  }, [fileIdArray]); // if fileIdArray changes

  // Filter out duplicates
  const uniqueCommentsArray = [];
  commentsArray.forEach((comment) => {
    const exists = uniqueCommentsArray.some(
      (uniqueComment) => uniqueComment.comment_id === comment.comment_id,
    );
    if (!exists) {
      uniqueCommentsArray.push(comment);
    }
  });

  // Combine item data and comments
  const combinedData = userItemsArray.map((item) => {
    const associatedComment = uniqueCommentsArray.find(
      (comment) => comment.file_id === item.file_id,
    );

    return {
      soldItem: item,
      associatedComment,
    };
  });

  if (combinedData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
        <Text style={styles.loadingText}></Text>
        <Text style={styles.loadingText}>Nothing to show yet.</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.pageTitleContainer}>
        <View style={styles.pageSubTitleView}>
          <Text style={styles.pageSubTitle}>Sold History</Text>
        </View>
      </View>
      <FlatList
        data={combinedData}
        numColumns={1}
        renderItem={({item}) => (
          <SoldListItem
            navigation={navigation}
            singleSoldItem={item.soldItem}
            salesData={item.associatedComment}
          />
        )}
      />
    </View>
  );
};

SoldList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SoldList;
