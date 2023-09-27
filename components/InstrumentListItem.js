import {Image} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem as RNEListItem } from '@rneui/themed';

const InstrumentListItem = ({singleInstrument, navigation}) => {
    return (<RNEListItem
        containerStyle={{ backgroundColor: 'rgb(231,223,223)' }}
        onPress={() => {
            navigation.navigate('SingleInstrument', singleInstrument);
        }}
      >
        <Image
            source={ singleInstrument.image}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        
      </RNEListItem>
      );
    };

InstrumentListItem.propTypes = {
    singleInstrument: PropTypes.object,
    navigation: PropTypes.object,
};

export default InstrumentListItem;