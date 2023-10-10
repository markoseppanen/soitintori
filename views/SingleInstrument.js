import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Card, Icon, Text, ListItem, Button} from '@rneui/themed';
import {View, SafeAreaView, Alert, TouchableOpacity} from 'react-native';
import {mediaUrl} from '../utils/app-config';
import styles from '../styles/Styles';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useComment} from '../hooks/ApiHooks';
import ImageModal from '../modals/ImageModal';
import BuyModal from '../modals/BuyModal';
import SuccessModal from '../modals/SuccessModal';

export const SingleInstrument = ({route, navigation}) => {
  const {user, isLoggedIn} = useContext(MainContext);
  const {commentsArray, postComment} = useComment();
  const [receiptId, setReceiptId] = useState(null);
  // console.log('USER information: ', user); // user data is null if not logged in
  // console.log('route params: ', route.params);
  const {
    description,
    thumbnails,
    filename,
    file_id: fileId,
    user_id,
  } = route.params;
  // State variables for modals
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const toggleImageModal = () => {
    setImageModalVisible(!imageModalVisible);
  };
  const [buyModalVisible, setBuyModalVisible] = useState(false);
  const toggleBuyModal = () => {
    setBuyModalVisible(!buyModalVisible);
  };

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const toggleSuccessModal = () => {
    setSuccessModalVisible(!successModalVisible);
  };

  const navigateToCategories = () => {
    navigation.navigate('Categories');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const modifyListing = async () => {
    // console.log('modifying file', fileId);
    navigation.navigate('Edit Listing', route);
  };

  const dataIntoBuyerJSON = (user) => {
    const fullName = JSON.parse(user.full_name);
    const commentData = {
      isSold: true,
      buyer_email: user.email || '',
      buyer_name: fullName.full_name || user.username,
      buyer_phonenumber: fullName.phonenumber || '',
      buyer_address: fullName.address || '',
      buyer_postalcode: fullName.postal_code || '',
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

      // console.log('comment id from:', result.comment_id);
      setReceiptId(result.comment_id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (receiptId !== null) {
      toggleSuccessModal();
    }
  }, [receiptId]);

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
            <TouchableOpacity onPress={toggleImageModal}>
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
              visible={imageModalVisible}
              imageUrl={mediaUrl + filename}
              onClose={toggleImageModal}
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
                onPress={toggleBuyModal}
                title="Buy"
                titleStyle={{color: 'white'}}
                buttonStyle={{backgroundColor: 'black', borderRadius: 20}}
                containerStyle={{marginTop: 10}}
              />
            ) : null}
          </View>
          <View>
            <BuyModal
              isVisible={buyModalVisible}
              onClose={toggleBuyModal}
              onConfirm={handleBuy}
            />
            <SuccessModal
              succeeded={successModalVisible}
              onClose={() => {
                navigateToCategories();
              }}
              receiptId={receiptId}
            />
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
