import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@rneui/themed';
import PropTypes from 'prop-types';
// import styles from '../styles/Styles';

const SuccessModal = ({succeeded, receiptId, onClose}) => {
  return (
    <Modal
      visible={succeeded}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}
    >
      <View style={styles.successModalContainer}>
        <View style={styles.successModalContent}>
          <View style={styles.successModalTitle}>
            <Text style={styles.successModalText}>Buy succeeded</Text>
          </View>
          <View style={styles.successModalTitle}>
            <Text style={styles.successModalText}>
              Receipt number: {receiptId}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => onClose()}
            style={styles.successModalButton}
          >
            <Text style={styles.successModalText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// siirretään Styles.js
const styles = StyleSheet.create({
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  successModalContent: {
    backgroundColor: 'rgb(0, 0, 0)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    elevation: 5, // Android shadow
  },
  successModalTitle: {
    width: 200,
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: 4,
    borderWidth: 1,
    color: 'rgb(255, 255, 255)',
    padding: 4,
    margin: 4,
  },
  successModalText: {
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  successModalButton: {
    width: 100,
    backgroundColor: 'rgb(255, 0, 0)',
    borderRadius: 4,
    borderWidth: 1,
    color: 'rgb(255, 255, 255)',
    padding: 4,
    margin: 4,
  },
});

SuccessModal.propTypes = {
  receiptId: PropTypes.number,
};

export default SuccessModal;
