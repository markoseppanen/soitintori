import React from 'react';
import {View, SafeAreaView} from 'react-native';
import CategoryList from '../components/CategoryList';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import styles from '../styles/Styles';

export const Categories = ({navigation}) => {
  return (
    <SafeAreaView style={styles.containerCategories}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Soitintori</Text>
      </View>
      <CategoryList navigation={navigation} />
    </SafeAreaView>
  );
};

Categories.propTypes = {
  navigation: PropTypes.object,
};
