import React from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import CategoryList from '../components/CategoryList';
import PropTypes from 'prop-types';
import {Text, Icon} from '@rneui/themed';
import styles from '../styles/Styles';

export const Categories = ({navigation}) => {
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };
  return (
    <SafeAreaView style={styles.containerCategories}>
      <View style={styles.pageTitleContainer}>
        <View style={styles.pageTitleView}>
          <Text style={styles.pageTitle}>Soitintori</Text>
        </View>
        <View style={styles.searchIconView}>
          <TouchableOpacity onPress={handleSearchPress}>
            <Icon name="search" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <CategoryList navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

Categories.propTypes = {
  navigation: PropTypes.object,
};
