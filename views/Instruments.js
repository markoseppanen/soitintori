import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import InstrumentList from '../components/InstrumentList';
import PropTypes from 'prop-types';
import styles from '../styles/Styles';

export const Instruments = ({route, navigation}) => {
  const [categoryTitle, setCategoryTitle] = useState(null);

  useEffect(() => {
    if (route.params) {
      setCategoryTitle(route.params.categoryTitle);
    }
  }, [route.params]);

  if (categoryTitle === null) {
    return null;
  }

  return (
    <SafeAreaView style={styles.containerInstruments}>
      <InstrumentList navigation={navigation} categoryTitle={categoryTitle} />
    </SafeAreaView>
  );
};

Instruments.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
