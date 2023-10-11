import React from 'react';
import {Modal, View, Image, TouchableOpacity} from 'react-native';
import {Icon, Text} from '@rneui/themed';
import styles from '../styles/Styles';

const ReceiptModal = ({
  visible,
  imageUrl,
  onClose,
  receiptId,
  price,
  purchase_date,
  seller_id,
  seller_phone,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}
    >
      <View style={styles.receiptModalContainer}>
        <View style={styles.receiptModalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => onClose()}
          >
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{uri: imageUrl}}
            style={styles.receiptModalImage}
            resizeMode="contain"
            onError={() => console.log('Image failed to load')}
          />

          <View style={styles.receiptModalTitleContainer}>
            <Text style={styles.receiptModalTitle}>Receipt</Text>
          </View>

          <View style={styles.receiptModalInfoContainer}>
            <View style={styles.receiptDataContainer}>
              <Text style={styles.receiptModalText}>Receipt id:</Text>
              <Text style={styles.receiptModalValue}>{receiptId}</Text>
            </View>
            <View style={styles.receiptDataContainer}>
              <Text style={styles.receiptModalText}>Date of sale:</Text>
              <Text style={styles.receiptModalValue}>{purchase_date}</Text>
            </View>
            <View style={styles.receiptDataContainer}>
              <Text style={styles.receiptModalText}>Price:</Text>
              <Text style={styles.receiptModalValue}>{price} €</Text>
            </View>
            <View style={styles.receiptDataContainer}>
              <Text style={styles.receiptModalText}>Seller id:</Text>
              <Text style={styles.receiptModalValue}>{seller_id}</Text>
            </View>
            <Text style={styles.receiptModalText}>Seller's phone number:</Text>
            <Text style={styles.receiptModalValue}>{seller_phone}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onClose()}
            style={styles.receiptModalButton}
          >
            <Text style={styles.receiptModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReceiptModal;
