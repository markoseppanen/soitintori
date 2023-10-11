import {View, FlatList} from 'react-native';
import {useMedia, useComment} from '../hooks/ApiHooks';
import InstrumentListItem from './InstrumentListItem';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {createInstrumentArray} from '../utils/functions.js';
import styles from '../styles/Styles';

const InstrumentList = ({navigation, categoryTitle}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);
  const {loadComments, commentsArray} = useComment();
  const [commentsFetched, setCommentsFetched] = useState(false);

  useEffect(() => {
    // console.log('checking the categoryTitle', categoryTitle);
  }, [categoryTitle]);

  const instrumentArray = createInstrumentArray(mediaArray); // function in utils/functions.js

  const singleCategoryInstruments = instrumentArray.filter(
    (item) => item.description.category === categoryTitle,
  );

  const fileIdArray = singleCategoryInstruments.map((item) => item.file_id);
  // console.log('fileIdArray: ', fileIdArray);

  const fetchComments = async () => {
    try {
      if (!commentsFetched && fileIdArray.length > 0) {
        // array of promises
        const loadCommentsPromises = fileIdArray.map(async (file_id) => {
          await loadComments(file_id);
        });
        // wait for all loadComments
        await Promise.all(loadCommentsPromises);
        setCommentsFetched(true);
      }
      // console.log('Comments array', commentsArray);
    } catch (error) {
      console.error('fetchComments', error);
    }
  };

  useEffect(() => {
    if (fileIdArray.length > 0) {
      fetchComments();
    }
  }, [fileIdArray]); // if fileIdArray changes

  const filteredInstrumentArray = singleCategoryInstruments.filter((item) => {
    const relatedComments = commentsArray.filter(
      (comment) => comment.file_id === item.file_id,
    );
    // console.log(`Related Comments for item ${item.file_id}:`, relatedComments);

    // isSold true?
    const hasSoldComment = relatedComments.some((comment) => {
      const commentData = JSON.parse(comment.comment);
      return commentData.isSold === true;
    });
    // console.log(`Has Sold Comment for item ${item.file_id}:`, hasSoldComment);

    return !hasSoldComment;
  });

  if (filteredInstrumentArray.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading instruments...</Text>
        <Text style={styles.loadingText}></Text>
        <Text style={styles.loadingText}>Nothing to show yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredInstrumentArray}
      numColumns={2}
      renderItem={({item}) => (
        <InstrumentListItem navigation={navigation} singleInstrument={item} />
      )}
    />
  );
};

InstrumentList.propTypes = {
  navigation: PropTypes.object.isRequired,
  categoryTitle: PropTypes.string.isRequired,
};

export default InstrumentList;
