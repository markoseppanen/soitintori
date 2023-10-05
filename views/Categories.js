import React from 'react';
import {View, Platform, SafeAreaView, StyleSheet} from 'react-native';
import CategoryList from '../components/CategoryList';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';

export const Categories = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Soitintori</Text>
      </View>
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
  pageTitleContainer: {
    backgroundColor: 'rgb(231,223,223)',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'flex-start',
    // shadow
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 3,
  },
});

Categories.propTypes = {
  navigation: PropTypes.object,
};
