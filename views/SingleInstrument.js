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

  // Show full image and metadata
  return (
    <Card>
      <Card.Title>soitin</Card.Title>
      <Card.Image
        source={ image}
        resizeMode="center"
        style={{height: 300}}
      />
      <ListItem>
        <Text>kuvaus</Text>
      </ListItem>
      <ListItem>
        <Icon name="person" />
        <Text>myyjä</Text>
      </ListItem>
    </Card>
  );
};

SingleInstrument.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
