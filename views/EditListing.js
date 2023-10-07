import {Card, Input, Button} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {useContext} from 'react';
import {mediaUrl} from '../utils/app-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import styles from '../styles/Styles';
import {ScrollView, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {fetchCategoryArray} from '../utils/functions';

const EditListing = ({navigation, route}) => {
  // console.log('route params in EditListing', route.params);
  const {
    params: {file_id: fileId, ...instrumentParams},
    filename,
  } = route.params;
  const {update, setUpdate} = useContext(MainContext);
  const {putMedia} = useMedia();
  const {mediaArray} = useMedia(update);
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      category: instrumentParams.description.category,
      title: instrumentParams.title,
      description: instrumentParams.description.description,
      price: isNaN(parseFloat(instrumentParams.description.price))
        ? 0
        : parseFloat(instrumentParams.description.price),
      address: instrumentParams.description.address,
      seller_phonenumber: instrumentParams.description.seller_phonenumber,
    },
    mode: 'onBlur',
  });

  const sortedCategoryArray = fetchCategoryArray(mediaArray);

  const dataForUpdate = (updateData) => {
    const updateJSON = {
      title: updateData.title,
      description: JSON.stringify({
        category: updateData.category,
        description: updateData.description,
        price: parseFloat(updateData.price),
        address: updateData.address,
        seller_phonenumber: updateData.seller_phonenumber,
      }),
    };
    console.log('updateJSON: ', updateJSON);
    return updateJSON;
  };

  const modifyListing = async (updateData) => {
    const updatedDataJSON = dataForUpdate(updateData);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await putMedia(fileId, token, updatedDataJSON);
      console.log('updateMedia()', result.message);
      Alert.alert('Update succeeded', result.message);
      setUpdate(!update);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Image
          source={{uri: mediaUrl + instrumentParams.filename}}
          style={styles.modifyImage}
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
              errorMessage={errors.title?.message}
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
              value={value !== undefined ? value.toString() : ''}
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
          title="Reset"
          color={'error'}
          onPress={() => {
            reset();
          }}
        />
        <Button
          disabled={errors.description || errors.title}
          title="Update"
          onPress={handleSubmit(modifyListing)}
        />
      </Card>
    </ScrollView>
  );
};

EditListing.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditListing;
