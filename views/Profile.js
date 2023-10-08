import {Alert, ScrollView, View} from 'react-native';
import {Button, Card, Icon, ListItem, Text} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import ProfileForm from '../forms/ProfileForm';
import {PropTypes} from 'prop-types';

export const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);

  const fullName = JSON.parse(user.full_name);

  //console.log('user',user)
  const logOut = async () => {
    Alert.alert('Log Out', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          console.log('logging out');
          try {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  const myListing = async () => {
    navigation.navigate('Current Listing');
  };

  const toHistory = async () => {
    navigation.navigate('Personal History');
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>Profile</Card.Title>

        <ListItem>
          <Icon name="person" />
          <ListItem.Title>{fullName.full_name}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Icon name="phone" />
          <ListItem.Title>{fullName.phonenumber}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Icon name="home" />
          <ListItem.Title>{fullName.address}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Icon name="apartment" />
          <ListItem.Title>{fullName.postal_code}</ListItem.Title>
        </ListItem>

        <ListItem>
          <Icon name="email" />
          <ListItem.Title>{user.email}</ListItem.Title>
        </ListItem>
        <Card.Divider />
        <Button size="sm" onPress={logOut}>
          Log out!
          <Icon name="logout"></Icon>
        </Button>
      </Card>
      <Card>
        <Button size="sm" onPress={myListing}>
          Current Listing
        </Button>
        <Button size="sm" onPress={toHistory}>
          History
          <Icon name="history"></Icon>
        </Button>
      </Card>
      <Card>
        <ProfileForm user={user} />
      </Card>
    </ScrollView>
  );
};
Profile.propTypes = {
  user: PropTypes.object,
};
