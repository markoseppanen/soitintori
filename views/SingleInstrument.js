import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, Icon, Text, ListItem, Button} from '@rneui/themed';
import {View, SafeAreaView, Alert, TouchableOpacity} from 'react-native';
import {mediaUrl} from '../utils/app-config';
import styles from '../styles/Styles';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useComment} from '../hooks/ApiHooks';
import ImageModal from './ImageModal';

export const SingleInstrument = ({route, navigation}) => {
  const {user, isLoggedIn} = useContext(MainContext);
  const {postComment} = useComment();
  // console.log('USER information: ', user);
  const buyerData = JSON.parse(user.full_name);
  // console.log(user.full_name);
  // console.log('route params: ', route.params);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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

  const modifyListing = async () => {
    console.log('modifying file', fileId);
    navigation.navigate('Edit Listing', route);
  };

  const dataIntoBuyerJSON = (user) => {
    const commentData = {
      isSold: true,
      buyer_email: user.email || '',
      buyer_name: buyerData.full_name || user.username,
      buyer_phonenumber: buyerData.phonenumber || '',
      buyer_address: buyerData.address || '',
      buyer_postalcode: buyerData.postal_code || '',
    };

    const buyerJSON = {
      file_id: fileId,
      comment: JSON.stringify(commentData),
    };

    console.log('buyerJSON: ', buyerJSON);
    return buyerJSON;
  };

  const handleBuy = async () => {
    const updatedDataJSON = dataIntoBuyerJSON(user);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postComment(token, updatedDataJSON);
      console.log('UPDATE COMMENT: ', result.message);
      Alert.alert('Buy succeeded', `Receipt id: ${result.comment_id}`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.navigate('Categories');
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
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
            <TouchableOpacity onPress={toggleModal}>
              <Card.Image
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
            </TouchableOpacity>

            <ImageModal
              visible={isModalVisible}
              imageUrl={mediaUrl + thumbnails.w640}
              onClose={toggleModal}
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
                onPress={modifyListing}
                title="Modify"
                titleStyle={{color: 'white'}}
                buttonStyle={{backgroundColor: 'black', borderRadius: 20}}
                containerStyle={{marginTop: 10}}
              />
            ) : isLoggedIn ? (
              <Button
                onPress={handleBuy}
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
};
