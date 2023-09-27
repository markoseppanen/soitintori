import {FlatList, StyleSheet} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/app-config';
import InstrumentListItem from './InstrumentListItem';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const InstrumentList = ({navigation, categoryTitle}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);
  console.log(mediaArray);

  // mediaArray -> instrumentArray, kenoviivojen poisto description kentästä ja lopuksi filtteröinti kategorian mukaan
  const instrumentArray = mediaArray
    .map((item) => {
      try {
        // Kenoviivojen parsiminen
        const description = JSON.parse(item.description);
        return {
          ...item,
          description, // Siistitty description
        };
      } catch (error) {
        // Parsing errors
        //console.error('Parsing error:', error);
        return item;
      }
    })
    .filter((item) => item.description.category === categoryTitle);

  // Jos katekoriassa ei ole yhtään instrumenttia
  if (instrumentArray.length === 0) {
    return <Text>Nothing to show yet</Text>;
  }

  return (
    <FlatList
      data={instrumentArray}
      numColumns={2}
      renderItem={({item}) => (
        <InstrumentListItem
          navigation={navigation}
          category={item.description.category}
          description={item.description.description}
          price={item.description.price}
          address={item.description.address}
          seller_phonenumber={item.description.seller_phonenumber}
          image={{uri: mediaUrl + item.thumbnails.w160}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

InstrumentList.propTypes = {
  navigation: PropTypes.object,
};

export default InstrumentList;
