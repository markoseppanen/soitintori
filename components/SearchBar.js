import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import styles from '../styles/Styles';

const SearchBar = ({onSearch}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // search text to SearchList
    onSearch(searchText);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        style={styles.searchInput}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
