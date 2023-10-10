import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@rneui/themed';
import styles from '../styles/Styles';

const BuyModal = ({isVisible, onConfirm, onClose}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}
    >
      <View style={styles.buyModalContainer}>
        <View style={styles.buyModalContent}>
          <View style={styles.buyModalTitle}>
            <Text style={styles.buyModalText}>Proceed to pay...</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onClose();
              onConfirm();
            }}
            style={styles.buyModalButton}
          >
            <Text style={styles.buyModalText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onClose()}
            style={styles.buyModalButton}
          >
            <Text style={styles.buyModalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BuyModal;
