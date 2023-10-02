import {FlatList, StyleSheet} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import InstrumentListItem from './InstrumentListItem';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import {useContext, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';

const InstrumentList = ({navigation, categoryTitle}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);

  useEffect(() => {
    console.log('checking the categoryTitle', categoryTitle);
  }, [categoryTitle]);

  // console.log('checking the categoryTitle', categoryTitle);
  // console.log('mediaArray', mediaArray);

  // mediaArray -> instrumentArray
  const instrumentArray = mediaArray
    .map((item) => {
      try {
        // remove backslashes
        const description = JSON.parse(item.description.replace(/\\/g, ''));
        // console.log('Cleaned description:', item);
        return {
          ...item,
          description,
        };
      } catch (error) {
        // Checking errors
        // console.error('Parsing error:', error);
        return item;
      }
    })
    .filter(
      (item) =>
        item.description &&
        item.description.category !== undefined &&
        item.description.category === categoryTitle,
    );

  // console.log(instrumentArray);

  // Jos ei ole yhtään instrumenttia
  if (instrumentArray.length === 0) {
    return <Text>Nothing to show yet</Text>;
  }

  return (
    <FlatList
      data={instrumentArray}
      numColumns={2}
      renderItem={({item}) => (
        <InstrumentListItem navigation={navigation} singleInstrument={item} />
      )}
    />
  );
};

InstrumentList.propTypes = {
  navigation: PropTypes.object.isRequired,
  categoryTitle: PropTypes.string.isRequired,
};

export default InstrumentList;
