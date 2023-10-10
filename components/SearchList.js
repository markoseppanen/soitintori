import {FlatList, View, SafeAreaView} from 'react-native';
import SearchBar from './SearchBar';
import {useMedia, useComment} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import SearchListItem from './SearchListItem';
import {createInstrumentArray} from '../utils/functions.js';
import styles from '../styles/Styles';

const SearchList = ({navigation}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);
  const {loadComments, commentsArray} = useComment();
  const [commentsFetched, setCommentsFetched] = useState(false);
  const [filteredMedia, setFilteredMedia] = useState(mediaArray);

  // create the instrumentArray
  const instrumentArray = createInstrumentArray(mediaArray);

  // map the file_ids of instrumentArray
  const fileIdArray = instrumentArray.map((item) => item.file_id);

  // fetch all comments related to file_ids
  const fetchComments = async () => {
    try {
      if (!commentsFetched && fileIdArray.length > 0) {
        const loadCommentsPromises = fileIdArray.map(async (file_id) => {
          await loadComments(file_id);
        });
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
  }, [fileIdArray]); // launch fetchComments if fileIdArray changes

  const filteredInstrumentArray = instrumentArray.filter((item) => {
    const relatedComments = commentsArray.filter(
      (comment) => comment.file_id === item.file_id,
    );
    // console.log(`Related Comments for item ${item.file_id}:`, relatedComments);

    // isSold true? filter out if true
    const hasSoldComment = relatedComments.some((comment) => {
      const commentData = JSON.parse(comment.comment);
      return commentData.isSold === true;
    });
    // console.log(`Has Sold Comment for item ${item.file_id}:`, hasSoldComment);

    return !hasSoldComment;
  });

  const handleSearch = (searchText) => {
    const filteredData = filteredInstrumentArray.filter(
      (item) =>
        item.title.includes(searchText) || // You can customize this condition
        item.description.description.includes(searchText),
    );

    setFilteredMedia(filteredData);
  };

  return (
    <SafeAreaView style={styles.containerCategories}>
      <View style={styles.searchResultContainer}>
        <SearchBar onSearch={handleSearch} />
        {filteredMedia.length === 0 ? (
          <Text style={styles.noResultText}>No results found...</Text>
        ) : (
          <FlatList
            data={filteredMedia}
            numColumns={2}
            renderItem={({item}) => (
              <SearchListItem navigation={navigation} singleInstrument={item} />
            )}
            keyExtractor={(item) => item.file_id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

SearchList.propTypes = {
  navigation: PropTypes.object,
};

export default SearchList;
