import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Icon, Button, Text, ListItem as RNEListItem} from '@rneui/themed';
import {Image, TouchableOpacity} from 'react-native';
import {formatDateFromISO} from '../utils/functions';
import ImageModal from '../modals/ImageModal';
import styles from '../styles/Styles';
import SoldReceiptModal from '../modals/SoldReceiptModal';

const SoldListItem = ({singleSoldItem, salesData}) => {
  // console.log('salesData', salesData);
  // console.log('singleSoldItem', singleSoldItem);
  // console.log('singleSoldItem', singleSoldItem);

  // ReceiptData is available?
  if (!salesData) {
    return null; // if undefined, render nothing
  }
  const dateOfSale = formatDateFromISO(salesData.time_added);
  const commentData = JSON.parse(salesData.comment);
  const buyer_name = commentData.buyer_name;
  const buyer_phonenumber = commentData.buyer_phonenumber;
  // console.log('buyer_name', buyer_name);
  const receiptId = salesData.comment_id;
  // console.log('receiptId', receiptId);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const toggleImageModal = () => {
    setImageModalVisible(!imageModalVisible);
  };

  const [soldReceiptModalVisible, setSoldReceiptModalVisible] = useState(false);
  const toggleSoldReceiptModal = () => {
    setSoldReceiptModalVisible(!soldReceiptModalVisible);
  };

  return (
    <RNEListItem
      containerStyle={{backgroundColor: 'rgb(0, 0, 0)'}}
      onPress={() => {
        // console.log('image pressed', singleSoldItem.title);
      }}
    >
      <TouchableOpacity onPress={toggleImageModal}>
        <Image
          source={{uri: mediaUrl + singleSoldItem.thumbnails.w160}}
          style={{width: 80, height: 80, borderRadius: 6}}
        />
      </TouchableOpacity>
      <ImageModal
        visible={imageModalVisible}
        imageUrl={mediaUrl + singleSoldItem.thumbnails.w160}
        onClose={toggleImageModal}
      />
      <RNEListItem.Title style={styles.myCurrentListItemRNETitle}>
        {singleSoldItem.title}
      </RNEListItem.Title>
      <Text style={styles.rneListItemText}>{dateOfSale}</Text>
      <>
        <Button
          onPress={() => {
            toggleSoldReceiptModal();
          }}
          icon={<Icon name="info" size={20} color="white" />}
          buttonStyle={{
            backgroundColor: 'red',
            borderRadius: 4,
            width: 40,
            height: 40,
          }}
          containerStyle={{
            position: 'absolute',
            right: 20,
          }}
        />
      </>
      {soldReceiptModalVisible && (
        <SoldReceiptModal
          visible={soldReceiptModalVisible}
          receiptId={receiptId}
          price={singleSoldItem.description.price}
          buyer_name={buyer_name}
          buyer_phonenumber={buyer_phonenumber}
          imageUrl={mediaUrl + singleSoldItem.thumbnails.w160}
          dateOfSale={dateOfSale}
          toggleSoldReceiptModal={toggleSoldReceiptModal}
          onClose={() => toggleSoldReceiptModal()}
        />
      )}
    </RNEListItem>
  );
};

SoldListItem.propTypes = {
  singleSoldItem: PropTypes.object,
  salesData: PropTypes.object,
};

export default SoldListItem;
