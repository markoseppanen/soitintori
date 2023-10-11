import React from 'react';
import {View, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import styles from '../styles/Styles';
import MyCurrentList from '../components/MyCurrentList';

export const MyListing = ({navigation}) => {
  return (
    <SafeAreaView style={styles.containerCategories}>
      <View style={styles.pageTitleContainer}>
        <View style={styles.pageSubTitleView}>
          <Text style={styles.pageSubTitle}>User's current announcements</Text>
        </View>
      </View>
      <MyCurrentList navigation={navigation} />
    </SafeAreaView>
  );
};

MyListing.propTypes = {
  navigation: PropTypes.object,
};
