import React from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import InstrumentList from '../components/InstrumentList';
import PropTypes from 'prop-types';
import { Text } from '@rneui/themed';

export const Instruments = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <InstrumentList navigation={navigation} />
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

Instruments.propTypes = {
  navigation: PropTypes.object,
};
