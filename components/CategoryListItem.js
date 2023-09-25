import {Image} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem as RNEListItem } from '@rneui/themed';

const CategoryListItem = ({singleCategory, navigation}) => {
  return (<RNEListItem
    onPress={() => {
        navigation.navigate('InstrumentsView', singleCategory);
    }}
  >
    <Image
        source={require('../assets/guitars.png')}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
    <RNEListItem.Title>{singleCategory.title}</RNEListItem.Title>
    <RNEListItem.Subtitle numberOfLines={3}>
      {singleCategory.description}
    </RNEListItem.Subtitle>
    <RNEListItem.Chevron />
  </RNEListItem>
  );
};

CategoryListItem.propTypes = {
  singleCategory: PropTypes.object,
  navigation: PropTypes.object,
};

export default CategoryListItem;