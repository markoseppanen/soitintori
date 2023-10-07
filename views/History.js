import React from 'react';
import {View, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import styles from '../styles/Styles';
import SoldList from '../components/SoldList';
import PurchaseList from '../components/PurchaseList';

export const History = ({navigation}) => {
  return (
    <SafeAreaView style={styles.containerCategories}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Sold history</Text>
      </View>
      <SoldList navigation={navigation} />
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Purchase history</Text>
      </View>
      <PurchaseList navigation={navigation} />
    </SafeAreaView>
  );
};

History.propTypes = {
  navigation: PropTypes.object,
};
