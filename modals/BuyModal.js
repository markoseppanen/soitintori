import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@rneui/themed';
// import styles from '../styles/Styles';

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

// BuyModal siirretään Styles.js
const styles = StyleSheet.create({
  buyModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  buyModalContent: {
    backgroundColor: 'rgb(0, 0, 0)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    elevation: 5, // Android shadow
  },
  buyModalTitle: {
    width: 200,
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: 4,
    borderWidth: 1,
    color: 'rgb(255, 255, 255)',
    padding: 4,
    margin: 4,
  },
  buyModalText: {
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  buyModalButton: {
    width: 100,
    backgroundColor: 'rgb(255, 0, 0)',
    borderRadius: 4,
    borderWidth: 1,
    color: 'rgb(255, 255, 255)',
    padding: 4,
    margin: 4,
  },
});

export default BuyModal;
