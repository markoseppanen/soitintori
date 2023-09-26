import React from 'react';
import PropTypes from 'prop-types';
// import {mediaUrl} from '../utils/app-config'; will be added later
// import {formatDate} from '../utils/functions'; maybe used later
import { Card, Icon, Text, ListItem } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

export const SingleInstrument = ({ route, navigation }) => {
  console.log('route params', route.params);
  const {
    category,
    description,
    price,
    address,
    seller_phonenumber,
    image
  } = route.params;

  return (
    <View style={ styles.container }>
      <Card containerStyle={{ margin: 10, backgroundColor: 'rgb(231,223,223)', alignItems: 'center' }}>
        
          <Card.Image
            source={image}
            resizeMode="center"
            style={{width: 300, height: 200, borderRadius: 30 } }
          />


        <View style={ styles.cardBottom }>
          <ListItem containerStyle={{ backgroundColor: 'rgb(134,72,39)' }}>
          <Text style={ styles.itemText } >{description}, {price} €</Text>
        </ListItem>
        <ListItem containerStyle={{ backgroundColor: 'rgb(134,72,39)' }}>
          <Icon name="place" color='#fff' />
          <Text style={ styles.itemText }>{address}</Text>
        </ListItem>
        <ListItem containerStyle={{ backgroundColor: 'rgb(134,72,39)' }}>
          <Icon name="phone" color='#fff' />
          <Text style={ styles.itemText }>{seller_phonenumber}</Text>
        </ListItem>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(231,223,223)',
    flex: 1,
  },
  cardTop: {
    backgroundColor: 'rgb(231,223,223)',
    padding: 20,
    margin: 0,
  },
  cardBottom: {
    backgroundColor: 'rgb(134,72,39)',
    padding: 20,
    borderRadius: 30,
    marginTop: 40,
    width: 'auto'
  },
  itemText: {
    fontSize: 20,
    color: 'rgb(255,255,255)'
  }
});

SingleInstrument.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
