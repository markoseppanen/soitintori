import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem as RNEListItem} from '@rneui/themed';
import {mediaUrl} from '../utils/app-config';

const InstrumentListItem = ({navigation, singleInstrument}) => {
  return (
    <RNEListItem
      containerStyle={{backgroundColor: 'rgb(0, 0, 0)'}}
      onPress={() => {
        navigation.navigate('SingleInstrument', singleInstrument);
      }}
    >
      <Image
        source={{uri: mediaUrl + singleInstrument.thumbnails.w160}}
        style={{width: 150, height: 150, borderRadius: 6}}
      />
    </RNEListItem>
  );
};

InstrumentListItem.propTypes = {
  singleInstrument: PropTypes.object,
  navigation: PropTypes.object,
};

export default InstrumentListItem;
