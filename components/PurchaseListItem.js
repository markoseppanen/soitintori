import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {ListItem as RNEListItem, Icon, Button, Text} from '@rneui/themed';
import {Image, TouchableOpacity} from 'react-native';
import {formatDateFromISO} from '../utils/functions';
import ImageModal from '../modals/ImageModal';
import ReceiptModal from '../modals/ReceiptModal';
import styles from '../styles/Styles';

const PurchaseListItem = ({singlePurchasedItem, purchaseData}) => {
  console.log('purchaseData: ', purchaseData);
  const purchase_date = formatDateFromISO(purchaseData.time_added);
  // console.log('purchase_date', purchase_date);

  const commentData = JSON.parse(purchaseData.comment);
  const buyer_name = commentData.buyer_name;
  const buyer_phonenumber = commentData.buyer_phonenumber;
  // console.log('buyer_name', buyer_name);
  const receiptId = purchaseData.comment_id;

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const toggleImageModal = () => {
    setImageModalVisible(!imageModalVisible);
  };

  const [receiptModalVisible, setReceiptModalVisible] = useState(false);
  const toggleReceiptModal = () => {
    setReceiptModalVisible(!receiptModalVisible);
  };

  return (
    <RNEListItem
      containerStyle={{backgroundColor: 'rgb(0, 0, 0)'}}
      onPress={() => {
        // console.log('touched!', singlePurchasedItem.title);
      }}
    >
      <TouchableOpacity onPress={toggleImageModal}>
        <Image
          source={{uri: mediaUrl + singlePurchasedItem.thumbnails.w160}}
          style={{width: 80, height: 80, borderRadius: 6}}
        />
      </TouchableOpacity>
      <ImageModal
        visible={imageModalVisible}
        imageUrl={mediaUrl + singlePurchasedItem.thumbnails.w160}
        onClose={toggleImageModal}
      />
      <RNEListItem.Title style={styles.myCurrentListItemRNETitle}>
        {singlePurchasedItem.title}
      </RNEListItem.Title>
      <Text style={styles.rneListItemText}>{purchase_date}</Text>
      <>
        <Button
          onPress={() => {
            toggleReceiptModal();
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
      {receiptModalVisible && (
        <ReceiptModal
          visible={receiptModalVisible}
          purchaseData={purchaseData}
          imageUrl={mediaUrl + singlePurchasedItem.thumbnails.w160}
          purchase_date={purchase_date}
          receiptId={receiptId}
          price={singlePurchasedItem.description.price}
          seller_id={singlePurchasedItem.user_id}
          seller_phone={singlePurchasedItem.description.seller_phonenumber}
          toggleReceiptModal={toggleReceiptModal}
          onClose={() => toggleReceiptModal()}
        />
      )}
    </RNEListItem>
  );
};

PurchaseListItem.propTypes = {
  singlePurchasedItem: PropTypes.object,
  purchaseData: PropTypes.object,
};

export default PurchaseListItem;
