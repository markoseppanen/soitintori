import {Image} from 'react-native';
import {mediaUrl} from '../utils/app-config';
import PropTypes from 'prop-types';
import {ListItem as RNEListItem} from '@rneui/themed';

const InstrumentListItem = ({description, price, address, seller_phonenumber, image, navigation}) => {
  return (
    <RNEListItem
      containerStyle={{backgroundColor: 'rgb(231,223,223)'}}
      onPress={() => {
        navigation.navigate('SingleInstrument', {
          description: description,
          price: price,
          address: address,
          seller_phonenumber: seller_phonenumber,
          image: image,
        });
      }}
    >
      <Image
        source={image}
        style={{width: 150, height: 150, borderRadius: 10}}
      />
    </RNEListItem>
  );
};

InstrumentListItem.propTypes = {
  singleInstrument: PropTypes.object,
  navigation: PropTypes.object,
};

export default InstrumentListItem;
