import {FlatList} from 'react-native';
import {useMedia, useComment} from '../hooks/ApiHooks';
import MyCurrentListItem from './MyCurrentListItem';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {createInstrumentArray} from '../utils/functions.js';

const MyCurrentList = ({navigation}) => {
  const {update} = useContext(MainContext);
  const {user} = useContext(MainContext);
  const {mediaArray} = useMedia(update);
  const {loadComments, commentsArray} = useComment();
  const [commentsFetched, setCommentsFetched] = useState(false);

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
  }, [fileIdArray]);

  const filteredInstrumentArray = userItemsArray.filter((item) => {
    const relatedComments = commentsArray.filter(
      (comment) => comment.file_id === item.file_id,
    );

    const hasSoldComment = relatedComments.some((comment) => {
      const commentData = JSON.parse(comment.comment);
      return commentData.isSold === true;
    });

    return !hasSoldComment;
  });
  console.log('own items', filteredInstrumentArray);

  if (filteredInstrumentArray.length === 0) {
    return <Text>Nothing to show yet</Text>;
  }

  return (
    <FlatList
      data={filteredInstrumentArray}
      numColumns={1}
      renderItem={({item}) => (
        <MyCurrentListItem navigation={navigation} singleCurrentItem={item} />
      )}
    />
  );
};

MyCurrentList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyCurrentList;
