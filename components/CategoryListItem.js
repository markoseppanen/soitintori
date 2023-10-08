import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem as RNEListItem} from '@rneui/themed';
import styles from '../styles/Styles';
import {mediaUrl} from '../utils/app-config';

const CategoryListItem = ({singleCategory, navigation, categoryTitle}) => {
  const CategoryImage = () => {
    const {width: screenWidth} = Dimensions.get('window');
    const imageWidth = screenWidth * 0.9;

    return (
      <View>
        <Image
          source={{uri: mediaUrl + singleCategory.filename}}
          style={{width: imageWidth, height: 120, borderRadius: 10}}
        />
      </View>
    );
  };

  return (
    <RNEListItem
      containerStyle={{backgroundColor: 'rgb(231,223,223)'}}
      onPress={() => {
        navigation.navigate('Instruments', {categoryTitle});
      }}
    >
      <View style={styles.containerCategoryListItem}>
        <CategoryImage singleCategory={singleCategory} />
        <View style={styles.overlayCategoryListItem}>
          <RNEListItem.Title style={styles.titleCategoryListItem}>
            {categoryTitle}
          </RNEListItem.Title>
        </View>
      </View>
    </RNEListItem>
  );
};

CategoryListItem.propTypes = {
  navigation: PropTypes.object,
  singleCategory: PropTypes.object,
  categoryTitle: PropTypes.string,
};

export default CategoryListItem;
