import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@rneui/themed';
import PropTypes from 'prop-types';
import styles from '../styles/Styles';

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
          <View style={styles.successModalTitleContainer}>
            <Text style={styles.successModalTitle}>Buy succeeded</Text>
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

SuccessModal.propTypes = {
  receiptId: PropTypes.number,
};

export default SuccessModal;
