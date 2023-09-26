import {Image} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem as RNEListItem } from '@rneui/themed';

const CategoryListItem = ({singleCategory, navigation}) => {
  return (<RNEListItem
    onPress={() => {
        navigation.navigate('Instruments', singleCategory);
    }}
  >
    <Image
        source={ singleCategory.image}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
    <RNEListItem.Title>{singleCategory.categoryTitle}</RNEListItem.Title>
    <RNEListItem.Subtitle numberOfLines={3}>
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