import React, {useState} from 'react';
import {View, SafeAreaView, ScrollView, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import styles from '../styles/Styles';
import SoldList from '../components/SoldList';
import PurchaseList from '../components/PurchaseList';

export const History = ({navigation}) => {
  const [changeList, setChangeList] = useState(false);

  return (
    <SafeAreaView style={styles.containerCategories}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Soitintori</Text>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableHighlight
          onPress={() => setChangeList(false)}
          style={[styles.tabButton, !changeList && styles.selectedTab]}
        >
          <Text
            style={[
              styles.tabButtonText,
              !changeList && styles.selectedTabText,
            ]}
          >
            Sold List
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setChangeList(true)}
          style={[styles.tabButton, changeList && styles.selectedTab]}
        >
          <Text
            style={[styles.tabButtonText, changeList && styles.selectedTabText]}
          >
            Purchase List
          </Text>
        </TouchableHighlight>
      </View>
      <View style={{flex: 1}}>
        {changeList === false ? (
          <SoldList navigation={navigation} />
        ) : (
          <PurchaseList navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
};

History.propTypes = {
  navigation: PropTypes.object,
};
