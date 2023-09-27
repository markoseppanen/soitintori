import {FlatList} from 'react-native';
import CategoryListItem from './CategoryListItem';

//temp array before better one
const categoryArray = [
  {
    id: '0',
    categoryTitle: 'Guitars',
    image: require('../assets/guitars.png'),
  },
  {
    id: '1',
    categoryTitle: 'Drums',
    image: require('../assets/drums.png'),
  },
  {
    id: '2',
    categoryTitle: 'Pianos',
    image: require('../assets/pianos.png'),
  },
  {
    id: '3',
    categoryTitle: 'Bassos',
    image: require('../assets/bassos.png'),
  },
  {
    id: '4',
    categoryTitle: 'WindInstruments',
    image: require('../assets/windinstruments.png'),
  },
  {
    id: '5',
    categoryTitle: 'Others',
    image: require('../assets/guitars.png'),
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
