import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ListItem as RNEListItem } from '@rneui/themed';

const CategoryListItem = ({ singleCategory, navigation }) => {
  return (
    <RNEListItem
      containerStyle={{ backgroundColor: 'rgb(231,223,223)' }}
      onPress={() => {
        navigation.navigate('Instruments', singleCategory);
      }}
    >
      <View style={styles.container}>
        <Image
          source={singleCategory.image}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <RNEListItem.Title style={styles.title}>
            {singleCategory.categoryTitle}
          </RNEListItem.Title>
        </View>
      </View>
    </RNEListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: -5,
  },
  image: {
    width: 300,
    height: 100,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'left',
  },
  title: {
    color: 'black',
    width: '100%',
    fontSize: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 5,
    borderRadius: 10,
    // shadow 
    textShadowColor: 'rgba(255, 255, 255, 0.9)', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 2, 
  },
});

CategoryListItem.propTypes = {
  singleCategory: PropTypes.object,
  navigation: PropTypes.object,
};

export default CategoryListItem;
