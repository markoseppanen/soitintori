import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  // perus container
  container: {
    flex: 1,
  },
  // Profile.js
  containerProfile: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
  },
  cardProfile: {
    backgroundColor: 'rgb(255,0,0)',
  },
  // Card titles
  cardTitle: {
    fontSize: 20,
  },
  // Login.js
  containerLogin: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
  },
  loginCard: {
    backgroundColor: 'rgb(255,0,0)',
    color: 'rgb(0,0,0)',
  },
  // AddListing.js
  containerAddListing: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
  },

  // Instruments.js
  containerInstruments: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: 'rgb(0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //MyCurrentListItem
  myCurrentListItemRNE: {
    backgroundColor: 'rgb(0, 0, 0)',
  },
  myCurrentListItemRNETitle: {
    color: 'rgb(255,255,255)',
  },
  // RNEListItems
  listItemContainer: {
    backgroundColor: 'rgb(0, 0, 0)',
    width: 'auto',
  },


// Categories.js styles
  containerCategories: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: 'rgb(0,0,0)',
    justifyContent: 'top',
  },
  pageTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pageTitleView: {
    backgroundColor: 'rgb(255,0,0)',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-start',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 3,
  },
  searchIconView: {
    padding: 5,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 30,
  },
  loadingContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCategories: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Search
  // SearchBar
  searchResultContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    width: 'auto',
  },
  searchInput: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(0,0,0)',
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
    width: '50%',
  },
  searchButton: {
    width: 100,
    backgroundColor: 'rgb(255,0,0)',
    color: 'rgb(231,223,223)',
    textItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  searchButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
    backgroundColor: 'rgb(0,0,0)',
    flex: 1,
  },
  singleInstrumentCard: {},
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
  // ImageModal
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '80%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default styles;
