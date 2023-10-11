import React from 'react';
import {View, Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Icon} from '@rneui/themed';
import styles from '../styles/Styles';
import SearchList from '../components/SearchList';

const Search = ({navigation}) => {
  const handleBackPress = () => {
    navigation.navigate('Categories');
  };
  return (
    <SafeAreaView style={styles.containerSearch}>
      <View style={styles.searchContentContainer}>
        <View style={styles.pageTitleContainer}>
          <View style={styles.pageTitleView}>
            <Text style={styles.pageTitle}>Soitintori</Text>
          </View>
          <View style={styles.searchIconView}>
            <TouchableOpacity onPress={handleBackPress}>
              <Icon name="arrow-back" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <SearchList navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
