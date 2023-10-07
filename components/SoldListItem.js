import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Text, Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {formatDateFromISO} from '../utils/functions';

const SoldListItem = ({singleSoldItem, salesData}) => {
  console.log('salesData', salesData);
  console.log('singleSoldItem', singleSoldItem);

  // ReceiptData is available?
  if (!salesData) {
    return null; // if undefined, render nothing
  }
  const dateOfSale = formatDateFromISO(salesData.time_added);

  const commentData = JSON.parse(salesData.comment);
  const buyer_name = commentData.buyer_name;
  console.log('buyer_name', buyer_name);

  return (
    <RNEListItem
      containerStyle={{backgroundColor: 'rgb(231,223,223)'}}
      onPress={() => {
        // console.log('image pressed', singleSoldItem.title);
      }}
    >
      <Avatar
        size="large"
        source={{uri: mediaUrl + singleSoldItem.thumbnails.w160}}
      ></Avatar>
      <RNEListItem.Title>{singleSoldItem.title}</RNEListItem.Title>
      <Text>{dateOfSale}</Text>
      <Text>Buyer: {buyer_name}</Text>
    </RNEListItem>
  );
};

SoldListItem.propTypes = {
  singleSoldItem: PropTypes.object,
  salesData: PropTypes.object,
};

export default SoldListItem;
