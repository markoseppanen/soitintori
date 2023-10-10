import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Icon, Button, ListItem as RNEListItem} from '@rneui/themed';
import styles from '../styles/Styles';
import {Image, Alert, TouchableOpacity} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import ImageModal from '../modals/ImageModal';
import ModifyForm from '../forms/ModifyForm';

const MyCurrentListItem = ({navigation, singleCurrentItem}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  console.log('singleCurrentItem', singleCurrentItem.file_id);

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const toggleImageModal = () => {
    setImageModalVisible(!imageModalVisible);
  };

  const [editFormVisible, setEditFormVisible] = useState(false);
  const toggleEditFormModal = () => {
    setEditFormVisible(!editFormVisible);
  };

  const deleteFile = async (file_id) => {
    Alert.alert('Delete?', `Announcement id: ${file_id}, Are your sure?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          console.log('deleting file', singleCurrentItem.file_id);
          try {
            const token = await AsyncStorage.getItem('userToken');
            const result = await deleteMedia(singleCurrentItem.file_id, token);
            console.log('deleteFile()', result.message);
            // update view after deleting a file
            setUpdate(!update);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <RNEListItem containerStyle={styles.myCurrentListItemRNE}>
      <TouchableOpacity onPress={toggleImageModal}>
        <Image
          source={{uri: mediaUrl + singleCurrentItem.thumbnails.w160}}
          style={{width: 80, height: 80, borderRadius: 8}}
        />
      </TouchableOpacity>
      <ImageModal
        visible={imageModalVisible}
        imageUrl={mediaUrl + singleCurrentItem.filename}
        onClose={toggleImageModal}
      />
      <RNEListItem.Title style={styles.myCurrentListItemRNETitle}>
        {singleCurrentItem.title}
      </RNEListItem.Title>
      <>
        <Button
          onPress={() => {
            toggleEditFormModal();
          }}
          icon={<Icon name="edit" size={20} color="white" />}
          buttonStyle={{backgroundColor: 'red', borderRadius: 4}}
          containerStyle={{marginTop: 5}}
        />
      </>
      <>
        <Button
          onPress={() => {
            deleteFile(singleCurrentItem.file_id);
          }}
          icon={<Icon name="delete" size={20} color="white" />}
          buttonStyle={{backgroundColor: 'red', borderRadius: 4}}
          containerStyle={{marginTop: 5}}
        />
      </>
      {editFormVisible && (
        <ModifyForm
          visible={editFormVisible}
          toggleEditFormModal={toggleEditFormModal}
          myInstrument={singleCurrentItem}
          onClose={() => toggleEditFormModal()}
        />
      )}
    </RNEListItem>
  );
};

MyCurrentListItem.propTypes = {
  navigation: PropTypes.object,
  singleCurrentItem: PropTypes.object,
};

export default MyCurrentListItem;
