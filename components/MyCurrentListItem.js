import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';

const MyCurrentListItem = ({singleCurrentItem}) => {
  return (
    <RNEListItem containerStyle={{backgroundColor: 'rgb(231,223,223)'}}>
      <Avatar
        size="large"
        source={{uri: mediaUrl + singleCurrentItem.thumbnails.w160}}
      ></Avatar>
      <RNEListItem.Title>{singleCurrentItem.title}</RNEListItem.Title>
    </RNEListItem>
  );
};

MyCurrentListItem.propTypes = {
  singleCurrentItem: PropTypes.object,
};

export default MyCurrentListItem;
