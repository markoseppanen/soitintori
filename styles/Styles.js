import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  // perus container
  container: {
    flex: 1,
  },
  // Upload
  uploadImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'cover',
  },
});

export default styles;
