import {FlatList} from 'react-native';
import {useMedia, useComment} from '../hooks/ApiHooks';
import PurchaseListItem from './PurchaseListItem';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {createInstrumentArray} from '../utils/functions.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PurchaseList = ({navigation}) => {
  const {update} = useContext(MainContext);
  const [userComments, setUserComments] = useState([]);
  const {mediaArray} = useMedia(update);
  const {getCommentsByToken} = useComment();
  const [commentsFetched, setCommentsFetched] = useState(false);

  const instrumentArray = createInstrumentArray(mediaArray);

  const filesIdArray = instrumentArray.map((item) => item.file_id);

  // get comments by user
  const fetchUserComments = async () => {
    try {
      if (!commentsFetched && filesIdArray.length > 0) {
        const token = await AsyncStorage.getItem('userToken');
        // console.log('Fetching user comments...');
        const fetchedUserComments = await getCommentsByToken(token);

        // console.log('Fetched user comments:', fetchedUserComments);

        if (fetchedUserComments && fetchedUserComments.length > 0) {
          setUserComments(fetchedUserComments);
          setCommentsFetched(true);
        } else {
          console.log('No user comments found.');
        }
      }
    } catch (error) {
      console.error('fetchUserComments', error.message);
    }
  };

  useEffect(() => {
    if (!commentsFetched) {
      fetchUserComments();
    }
  }, [filesIdArray]);

  const purchasedFilesByCurrentUser = instrumentArray.filter((item) => {
    // if the file_id exists in userComments
    return userComments.some((comment) => comment.file_id === item.file_id);
  });

  // Combine item data and comments
  const combinedData = purchasedFilesByCurrentUser.map((purchasedItem) => {
    // associated comment
    const associatedComment = userComments.find(
      (comment) => comment.file_id === purchasedItem.file_id,
    );

    // combined object
    return {
      purchasedItem,
      associatedComment,
    };
  });

  // console.log('purchasedFilesByCurrentUser ',purchasedFilesByCurrentUser);
  // console.log('combinedData ',combinedData);

  if (purchasedFilesByCurrentUser.length === 0) {
    return <Text>Nothing to show yet</Text>;
  }

  return (
    <FlatList
      data={combinedData}
      numColumns={1}
      renderItem={({item}) => (
        <PurchaseListItem
          navigation={navigation}
          singlePurchasedItem={item.purchasedItem}
          purchaseData={item.associatedComment}
        />
      )}
    />
  );
};

PurchaseList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PurchaseList;
