import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {formatDateFromISO} from '../utils/functions';

const PurchaseListItem = ({singlePurchasedItem, purchaseData}) => {
  // console.log('purchaseData: ', purchaseData);
  const purchase_date = formatDateFromISO(purchaseData.time_added);
  // console.log('purchase_date', purchase_date);
  return (
    <RNEListItem
      containerStyle={{backgroundColor: 'rgb(231,223,223)'}}
      onPress={() => {
        console.log('touched!', singlePurchasedItem.title);
      }}
    >
      <Avatar
        size="large"
        source={{uri: mediaUrl + singlePurchasedItem.thumbnails.w160}}
      ></Avatar>
      <RNEListItem.Title>{singlePurchasedItem.title}</RNEListItem.Title>
      <RNEListItem.Subtitle numberOfLines={3}>
        {purchase_date}
      </RNEListItem.Subtitle>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

PurchaseListItem.propTypes = {
  singlePurchasedItem: PropTypes.object,
  purchaseData: PropTypes.object,
};

export default PurchaseListItem;
