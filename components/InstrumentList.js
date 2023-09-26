import {FlatList} from 'react-native';
import InstrumentListItem from './InstrumentListItem';
import { Text } from '@rneui/themed';

const instrumentArray = [
  {
    id: '0',
    category: 'Guitars',
    description: 'Joku kitara',
    price: '50',
    address: "Jokukatu 14, 02600",
    seller_phonenumber: "+3581234567891",
    image: require('../assets/guitars.png')
  },
  {
    id: '1',
    category: 'Guitars',
    description: 'Joku toinen kitara',
    price: '130',
    address: "Toinenkatu 3, 03130",
    seller_phonenumber: "+3581234567892",
    image: require('../assets/guitars.png')
  },
  {
    id: '2',
    category: 'Drums',
    description: 'Myydään rummut',
    price: '100',
    address: "Toinenkatu 3, 03130",
    seller_phonenumber: "+3581234567892",
    image: require('../assets/drums.png')
  },
  {
    id: '3',
    category: 'WindInstruments',
    description: 'Joku trumpetti',
    price: '40',
    address: "Jokukatu 14, 02600",
    seller_phonenumber: "+3581234567891",
    image: require('../assets/windinstruments.png')
  },
  {
    id: '4',
    category: 'Pianos',
    description: 'Piano myynnissä',
    price: '90',
    address: "Jokukatu 14, 02600",
    seller_phonenumber: "+3581234567891",
    image: require('../assets/pianos.png')
  },
];

const InstrumentList = ({navigation, categoryTitle}) => {
  // Filter instruments based on the 'category' prop
  const filteredInstruments = instrumentArray.filter(
    (item) => item.category === categoryTitle
  );

  if (filteredInstruments.length === 0) {
    return <Text>Nothing to show yet</Text>;
  }

  return (
    <FlatList
      data={filteredInstruments}
      renderItem={({item}) => (
        <InstrumentListItem navigation={navigation} singleInstrument={item} />
      )}
    />
  );
};


export default InstrumentList;