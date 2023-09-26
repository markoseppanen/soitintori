import React from 'react';
import PropTypes from 'prop-types';
// import {mediaUrl} from '../utils/app-config';
import {formatDate} from '../utils/functions';
import {Card, Icon, Text, ListItem} from '@rneui/themed';

export const SingleInstrument = ({route, navigation}) => {
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
    <Card>
      <Card.Title>Myydään</Card.Title>
      <Card.Image
        source={ image}
        resizeMode="center"
        style={{height: 300}}
      />
      <ListItem>
        <Text>{description}, {price} €</Text>
      </ListItem>
      <ListItem>
        <Icon name="place" />
        <Text>{address}</Text>
      </ListItem>
      <ListItem>
        <Icon name="phone" />
        <Text>{seller_phonenumber}</Text>
      </ListItem>
    </Card>
  );
};

SingleInstrument.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
