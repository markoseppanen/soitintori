import {Card, Input, Button, Text} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {Alert, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useState, useEffect} from 'react';
import {appId, placeholderImage} from '../utils/app-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import styles from '../styles/Styles';
import {fetchCategoryArray} from '../utils/functions';

export const AddListing = ({navigation}) => {
  const {update, setUpdate} = useContext(MainContext);
  const [image, setImage] = useState(placeholderImage);
  const [type, setType] = useState('image');
  const {postMedia, loading} = useMedia();
  const {mediaArray} = useMedia(update);
  const {postTag} = useTag();
  const {user} = useContext(MainContext);

  let sellerData = {
    full_name: '',
    phonenumber: '',
    address: '',
    postal_code: '',
  };

  if (user && user.full_name) {
    try {
      sellerData = JSON.parse(user.full_name);
    } catch (error) {
      console.log('', error);
    }
  }

  useEffect(() => {
    console.log('sellerData', sellerData);
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      category: '',
      title: '',
      description: '',
      price: '',
      address:
        sellerData.address && sellerData.postal_code
          ? `${sellerData.address}, ${sellerData.postal_code}`
          : '',
      seller_phonenumber: `${sellerData.phonenumber}` || '',
    },
    mode: 'onBlur',
  });

  const sortedCategoryArray = fetchCategoryArray(mediaArray);

  // console.log('', sortedCategoryArray);

  const compileDataIntoJSON = (uploadData) => {
    const descriptionJSON = {
      category: uploadData.category,
      description: uploadData.description,
      price: parseFloat(uploadData.price),
      address: uploadData.address,
      seller_phonenumber: uploadData.seller_phonenumber,
    };

    return JSON.stringify(descriptionJSON);
  };

  const upload = async (uploadData) => {
    console.log('upload', uploadData);
    const formData = new FormData();
    formData.append('title', uploadData.title);
    formData.append('description', compileDataIntoJSON(uploadData));
    const filename = image.split('/').pop();

    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: filename,
      type: `${type}/${fileExtension}`,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('lataus', response);
      const tagResponse = await postTag(
        {
          file_id: response.file_id,
          tag: appId,
        },
        token,
      );
      console.log('postTag', tagResponse);
      setUpdate(!update);
      Alert.alert('Upload', `${response.message} (id: ${response.file_id})`, [
        {
          text: 'Ok',
          onPress: () => {
            resetForm();
            navigation.navigate('Add Listing');
          },
        },
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetForm = () => {
    setImage(placeholderImage);
    setType('image');
    reset();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 7],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type);
    }
  };

  return (
    <ScrollView style={styles.containerAddListing}>
      <Card>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(0, 0, 0)',
            borderWidth: 1,
            borderColor: 'rgb(0, 0, 0)',
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
          }}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{uri: image}}
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <Text
              style={{
                backgroundColor: 'rgb(0, 0, 0)',
                color: 'rgb(255, 255, 255)',
                fontSize: 20,
              }}
            >
              Choose Image
            </Text>
          )}
        </TouchableOpacity>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'is required'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Select Category" value="" />
              {sortedCategoryArray.map((category) => (
                <Picker.Item
                  key={category.description.categoryId}
                  label={category.description.categoryTitle}
                  value={category.description.categoryTitle}
                />
              ))}
            </Picker>
          )}
          name="category"
        />
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'is required'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
          name="title"
        />
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'is required'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
          name="description"
        />
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'is required'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Price"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.price?.message}
            />
          )}
          name="price"
        />
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'is required'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.address?.message}
            />
          )}
          name="address"
        />
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'is required'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Phone number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.seller_phonenumber?.message}
            />
          )}
          name="seller_phonenumber"
        />
        <Button
          title="Choose Media"
          buttonStyle={{backgroundColor: 'red', borderRadius: 4}}
          onPress={pickImage}
        />
        <Button
          title="Reset"
          buttonStyle={{backgroundColor: 'black', borderRadius: 4}}
          color={'error'}
          onPress={resetForm}
        />
        <Button
          loading={loading}
          buttonStyle={{backgroundColor: 'red', borderRadius: 4}}
          disabled={
            image == placeholderImage || errors.description || errors.title
          }
          title="Upload"
          onPress={handleSubmit(upload)}
        />
      </Card>
    </ScrollView>
  );
};

AddListing.propTypes = {
  navigation: PropTypes.object,
};
