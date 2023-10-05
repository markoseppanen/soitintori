import {Alert, ScrollView, View} from 'react-native';
import {Button, Card, Icon, ListItem, Text} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks/ApiHooks';
import ProfileForm from '../forms/ProfileForm';

export const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const {getFilesByTag} = useTag();

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

  return (
    <ScrollView>
      <Card>
        <Card.Title>Profile</Card.Title>
        {user.full_name && (
          <ListItem>
            <Icon name="person" />
            <ListItem.Title>{user.full_name}</ListItem.Title>
          </ListItem>
        )}
        <ListItem>
          <Icon name="email" />
          <ListItem.Title>{user.email}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Icon name="" />
          <ListItem.Title>{user.phonenumber}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Icon name="" />
          <ListItem.Title>{user.address}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Icon name="" />
          <ListItem.Title>{user.postal_code}</ListItem.Title>
        </ListItem>
        <Card.Divider />
        <Button size="sm" onPress={logOut}>
          Log out!
          <Icon name="logout"></Icon>
        </Button>
      </Card>
      <Card>
        <ProfileForm user={user} />
      </Card>
    </ScrollView>
  );
};
