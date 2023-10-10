import React from 'react';
import {Modal, View, Image, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import styles from '../styles/Styles';

const ImageModal = ({visible, imageUrl, onClose}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
          <Icon name="close" size={30} color="white" />
        </TouchableOpacity>
        <Image
          source={{uri: imageUrl}}
          style={styles.modalImage}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

export default ImageModal;
