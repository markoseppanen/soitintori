import {FlatList} from 'react-native';
import CategoryListItem from './CategoryListItem';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';

const CategoryList = ({navigation, categoryArray}) => {
  // console.log(categoryArray);

  if (!categoryArray || categoryArray.length === 0) {
    return <Text>Nothing to show yet</Text>;
  }

  const sortedCategoryArray = categoryArray.sort(
    (a, b) => a.categoryId - b.categoryId,
  );

  return (
    <FlatList
      data={sortedCategoryArray}
      renderItem={({item}) => (
        <CategoryListItem
          navigation={navigation}
          categoryId={item.categoryId}
          categoryTitle={item.categoryTitle}
          kategoria={item.kategoria}
          categoryImage={item.categoryImage}
        />
      )}
    />
  );
};

CategoryList.propTypes = {
  navigation: PropTypes.object,
  categoryArray: PropTypes.array,
};

export default CategoryList;
