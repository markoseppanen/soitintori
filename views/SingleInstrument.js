import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Card, Icon, Text, ListItem, Button} from '@rneui/themed';
import {View, SafeAreaView} from 'react-native';
import {mediaUrl} from '../utils/app-config';
import styles from '../styles/Styles';
import {MainContext} from '../contexts/MainContext';

export const SingleInstrument = ({route, navigation, singleInstrument}) => {
  const {user, isLoggedIn} = useContext(MainContext);
  // console.log('USER information: ', user);
  // console.log('route params: ', route.params);
  const {
    description,
    thumbnails,
    filename,
    file_id: fileId,
    user_id,
  } = route.params;
  const goBack = () => {
    navigation.goBack();
  };

  const modifyFile = async () => {
    console.log('modifying file', fileId);
    navigation.navigate('Modify Listing', route);
  };

  return (
    <SafeAreaView style={styles.singleInstrumentContainer}>
      <View style={styles.singleInstrumentContainer}>
        <Card
          containerStyle={{
            margin: 10,
            backgroundColor: 'rgb(231,223,223)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.singleInstrumentCardTop}>
            <Card.Image
              // onPress={zoomableImage}
              source={{uri: mediaUrl + thumbnails.w640}}
              resizeMode="cover"
              style={{
                width: 150,
                height: 200,
                borderWidth: 1,
                borderRadius: 30,
                alignContent: 'stretch',
              }}
            />
          </View>
          <View style={styles.singleInstrumentCardBottom}>
            <ListItem containerStyle={{backgroundColor: 'rgb(151,121,115)'}}>
              <Text style={styles.singleInstrumentItemText}>
                {description.description}, {description.price} €
              </Text>
            </ListItem>
            <ListItem containerStyle={{backgroundColor: 'rgb(151,121,115)'}}>
              <Icon name="place" color="#fff" />
              <Text style={styles.singleInstrumentItemText}>
                {description.address}
              </Text>
            </ListItem>
            <ListItem containerStyle={{backgroundColor: 'rgb(151,121,115)'}}>
              <Icon name="phone" color="#fff" />
              <Text style={styles.singleInstrumentItemText}>
                {description.seller_phonenumber}
              </Text>
            </ListItem>
          </View>
          <View style={styles.singleInstrumentButtonContainer}>
            <Button
              title="Go Back"
              titleStyle={{color: 'white'}}
              buttonStyle={{backgroundColor: 'black', borderRadius: 20}}
              onPress={() => {
                goBack();
              }}
              containerStyle={{marginTop: 10}}
            />
            {isLoggedIn && user.user_id === user_id ? (
              <Button
                onPress={modifyFile}
                title="Modify"
                titleStyle={{color: 'white'}}
                buttonStyle={{backgroundColor: 'black', borderRadius: 20}}
                containerStyle={{marginTop: 10}}
              />
            ) : isLoggedIn ? (
              <Button
                // onPress={handleBuy}
                title="Buy"
                titleStyle={{color: 'white'}}
                buttonStyle={{backgroundColor: 'black', borderRadius: 20}}
                containerStyle={{marginTop: 10}}
              />
            ) : null}
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

SingleInstrument.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  singleInstrument: PropTypes.object,
};
