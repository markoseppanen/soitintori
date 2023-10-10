import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem as RNEListItem} from '@rneui/themed';
import {mediaUrl} from '../utils/app-config';
import styles from '../styles/Styles';

const SearchListItem = ({navigation, singleInstrument}) => {
  return (
    <RNEListItem
      containerStyle={styles.listItemContainer}
      onPress={() => {
        navigation.navigate('SingleInstrument', singleInstrument);
      }}
    >
      <Image
        source={{uri: mediaUrl + singleInstrument.thumbnails.w160}}
        style={{width: 150, height: 150, borderRadius: 10}}
      />
    </RNEListItem>
  );
};

SearchListItem.propTypes = {
  singleInstrument: PropTypes.object,
  navigation: PropTypes.object,
};

export default SearchListItem;
