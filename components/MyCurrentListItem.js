import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import styles from '../styles/Styles';

const MyCurrentListItem = ({singleCurrentItem}) => {
  return (
    <RNEListItem containerStyle={styles.myCurrentListItemRNE}>
      <Avatar
        size="large"
        source={{uri: mediaUrl + singleCurrentItem.thumbnails.w160}}
      ></Avatar>
      <RNEListItem.Title style={styles.myCurrentListItemRNETitle}>{singleCurrentItem.title}</RNEListItem.Title>
    </RNEListItem>
  );
};

MyCurrentListItem.propTypes = {
  singleCurrentItem: PropTypes.object,
};

export default MyCurrentListItem;
