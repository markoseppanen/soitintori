import {Card, Input, Button} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {Alert, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useState} from 'react';
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
      address: '',
      seller_phonenumber: '',
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
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Image
          source={{uri: image}}
          style={styles.uploadImage}
          onPress={pickImage}
        />
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
        <Button title="Choose Media" onPress={pickImage} />
        <Button title="Reset" color={'error'} onPress={resetForm} />
        <Button
          loading={loading}
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
