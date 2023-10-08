import React, {useState} from 'react';
import {View, SafeAreaView, TouchableHighlight} from 'react-native';
import CategoryList from '../components/CategoryList';
import SearchList from '../components/SearchList';
import PropTypes from 'prop-types';
import {Text} from '@rneui/themed';
import styles from '../styles/Styles';

export const Categories = ({navigation}) => {
  const [search, setSearch] = useState(false);

  return (
    <SafeAreaView style={styles.containerCategories}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Soitintori</Text>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableHighlight
          onPress={() => setSearch(false)}
          style={[styles.tabButton, !search && styles.selectedTab]}
        >
          <Text
            style={[styles.tabButtonText, !search && styles.selectedTabText]}
          >
            Categories
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setSearch(true)}
          style={[styles.tabButton, search && styles.selectedTab]}
        >
          <Text
            style={[styles.tabButtonText, search && styles.selectedTabText]}
          >
            Search
          </Text>
        </TouchableHighlight>
      </View>
      <View style={{flex: 1}}>
        {search === false ? (
          <CategoryList navigation={navigation} />
        ) : (
          <SearchList navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
};

Categories.propTypes = {
  navigation: PropTypes.object,
};
