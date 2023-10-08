import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import InstrumentList from '../components/InstrumentList';
import PropTypes from 'prop-types';

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
    <SafeAreaView style={styles.container}>
      <InstrumentList navigation={navigation} categoryTitle={categoryTitle} />
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
  route: PropTypes.object,
};
