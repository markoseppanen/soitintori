import {Image} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem as RNEListItem } from '@rneui/themed';

const InstrumentListItem = ({singleInstrument, navigation}) => {
    return (<RNEListItem
        onPress={() => {
            navigation.navigate('SingleInstrument', singleInstrument);
        }}
      >
        <Image
            source={ singleInstrument.image}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
        <RNEListItem.Title>{singleInstrument.title}</RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={3}>
          {singleInstrument.description}
        </RNEListItem.Subtitle>
        <RNEListItem.Chevron />
      </RNEListItem>
      );
    };

InstrumentListItem.propTypes = {
    singleInstrument: PropTypes.object,
    navigation: PropTypes.object,
};

export default InstrumentListItem;