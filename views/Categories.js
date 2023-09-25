import React from 'react';
import { Text } from '@rneui/themed';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import CategoryList from '../components/CategoryList';
import PropTypes from 'prop-types';

export const Categories = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <CategoryList navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: 'rgb(231,223,223)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Categories.propTypes = {
  navigation: PropTypes.object,
};

