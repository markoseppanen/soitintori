import {FlatList} from 'react-native';
import CategoryListItem from './CategoryListItem';

//kategorioiden array ensin tässä 
const categoryArray = [
  {
    key: '0',
    title: 'Kitarat',
    description:
      '...',
  },
  {
    key: '1',
    title: 'Rummut',
    description:
      '... ',
  },
  {
    key: '2',
    title: 'Muut',
    description:
      ' ... ',
  },
];

const CategoryList = ({navigation}) => {
  return (
    <FlatList
      data={categoryArray}
      renderItem={({item}) => <CategoryListItem navigation={navigation} singleCategory={item} />}
    />
  );
};

export default CategoryList;