import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  // perus container
  container: {
    flex: 1,
  },
  // Categories.js styles
  containerCategories: {
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-start',
    // shadow
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 3,
  },
  // CategoriesListItem.js
  containerCategoryListItem: {
    position: 'relative',
    margin: 0,
  },
  imageCategoryListItem: {
    width: 300,
    height: 100,
    borderRadius: 8,
  },
  overlayCategoryListItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'left',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
  titleCategoryListItem: {
    alignSelf: 'center',
    color: 'white',
    width: '100%',
    fontSize: 26,
    backgroundColor: 'rgba(231, 223, 223, 0.2)',
    padding: 5,
    // shadow
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  // SingleInstrument.js
  singleInstrumentContainer: {
    backgroundColor: 'rgb(231,223,223)',
    flex: 1,
  },
  singleInstrumentCardTop: {
    backgroundColor: 'rgb(231,223,223)',
    padding: 5,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleInstrumentCardBottom: {
    backgroundColor: 'rgb(151,121,115)',
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    width: 'auto',
  },
  singleInstrumentItemText: {
    fontSize: 20,
    color: 'rgb(255,255,255)',
  },
  singleInstrumentButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  // Upload
  uploadImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  // Modify
  modifyImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  // ZoomableImage
  imgZoom: {
    flex: 1,
    backgroundColor: 'rgb(231,223,223)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
