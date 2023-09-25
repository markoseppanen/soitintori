import {FlatList} from 'react-native';
import InstrumentListItem from './InstrumentListItem';

// temp 
const instrumentArray = [
  {
    key: '0',
    title: 'Soitin 1',
    description: 'myyntiteksti yms',
  },
  {
    key: '1',
    title: 'Soitin 2',
    description: 'myyntiteksti yms',
  },
  {
    key: '2',
    title: 'Soitin 3',
    description: 'jne',
  },
];

const InstrumentList = ({navigation}) => {
  return (
    <FlatList
      data={instrumentArray}
      renderItem={({item}) => (
        <InstrumentListItem navigation={navigation} singleInstrument={item} />
      )}
    />
  );
};


export default InstrumentList;