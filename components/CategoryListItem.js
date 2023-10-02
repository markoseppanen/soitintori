import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem as RNEListItem} from '@rneui/themed';
import styles from '../styles/Styles';

const CategoryListItem = ({
  categoryId,
  categoryTitle,
  kategoria,
  categoryImage,
  navigation,
}) => {
  return (
    <RNEListItem
      containerStyle={{backgroundColor: 'rgb(231,223,223)'}}
      onPress={() => {
        navigation.navigate('Instruments', {categoryTitle});
      }}
    >
      <View style={styles.containerCategoryListItem}>
        <Image source={categoryImage} style={styles.imageCategoryListItem} />
        <View style={styles.overlayCategoryListItem}>
          <RNEListItem.Title style={styles.titleCategoryListItem}>
            {kategoria}
          </RNEListItem.Title>
        </View>
      </View>
    </RNEListItem>
  );
};

CategoryListItem.propTypes = {
  navigation: PropTypes.object,
};

export default CategoryListItem;
