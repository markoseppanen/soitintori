import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {mediaUrl} from '../utils/app-config';
import PropTypes from 'prop-types';

const CategoryImage = (singleCategory) => {
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

CategoryImage.propTypes = {
  singleCategory: PropTypes.object,
};

export default CategoryImage;
