import {Alert, ScrollView} from 'react-native';
import {Button, Card, Icon, ListItem, Text} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import ProfileForm from '../forms/ProfileForm';
import {PropTypes} from 'prop-types';
import styles from '../styles/Styles';

export const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);

  const fullName =
    user && user.full_name
      ? JSON.parse(user.full_name)
      : {
          full_name: '',
          phonenumber: '',
          address: '',
          postal_code: '',
        };

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
    <ScrollView style={styles.containerProfile}>
      <Card containerStyle={styles.cardProfile}>
        <Card.Title style={styles.cardTitle}>Profile</Card.Title>
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
        <Button
          buttonStyle={{backgroundColor: 'black', borderRadius: 6}}
          onPress={logOut}
        >
          Log out!
          <Icon name="logout" color="white"></Icon>
        </Button>
      </Card>
      <Card containerStyle={styles.cardProfile}>
        <Button
          buttonStyle={{backgroundColor: 'black', borderRadius: 6}}
          onPress={myListing}
        >
          Current Listing
        </Button>
        <Text></Text>
        <Button
          buttonStyle={{backgroundColor: 'black', borderRadius: 6}}
          onPress={toHistory}
        >
          History
          <Icon name="history" color="white"></Icon>
        </Button>
      </Card>
      <Card containerStyle={styles.cardProfile}>
        <ProfileForm user={user} />
      </Card>
    </ScrollView>
  );
};
Profile.propTypes = {
  user: PropTypes.object,
};
