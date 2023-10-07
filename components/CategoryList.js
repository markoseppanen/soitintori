import {FlatList} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useContext} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import CategoryListItem from './CategoryListItem';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import {fetchCategoryArray} from '../utils/functions';

const CategoryList = ({navigation}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);

  const sortedCategoryArray = fetchCategoryArray(mediaArray);

  if (!sortedCategoryArray || sortedCategoryArray.length === 0) {
    return <Text>Nothing to show yet</Text>;
  }

  return (
    <FlatList
      data={sortedCategoryArray}
      renderItem={({item}) => (
        <CategoryListItem
          navigation={navigation}
          singleCategory={item}
          categoryTitle={item.description.categoryTitle}
        />
      )}
    />
  );
};

CategoryList.propTypes = {
  navigation: PropTypes.object,
};

export default CategoryList;
