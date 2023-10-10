import {Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {useContext} from 'react';
import {mediaUrl} from '../utils/app-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import styles from '../styles/Styles';
import {Modal, Alert, ScrollView, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {fetchCategoryArray} from '../utils/functions';

const ModifyForm = ({myInstrument, visible, toggleEditFormModal}) => {
  console.log('myInstrument', myInstrument);
  const {file_id: fileId} = myInstrument;

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
      category: myInstrument.description.category,
      title: myInstrument.title,
      description: myInstrument.description.description,
      price: isNaN(parseFloat(myInstrument.description.price))
        ? 0
        : parseFloat(myInstrument.description.price),
      address: myInstrument.description.address,
      seller_phonenumber: myInstrument.description.seller_phonenumber,
    },
    mode: 'onBlur',
  });

  const sortedCategoryArray = fetchCategoryArray(mediaArray);
  console.log('sortedCategoryArray', sortedCategoryArray);

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
    // console.log('updateJSON: ', updateJSON);
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
      toggleEditFormModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleEditFormModal}
      style={styles.editModal}
    >
      <ScrollView
        style={{flex: 1, marginLeft: -10, marginRight: -10, marginTop: 20}}
      >
        <Card >
          <Button
            title="Cancel"
            onPress={toggleEditFormModal}
            buttonStyle={{
              backgroundColor: 'rgb(255, 0, 0)'
            }}
            titleStyle={{
              color: 'rgb(255, 255, 255)',
            }}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          />
          <Card.Image
            source={{uri: mediaUrl + myInstrument.filename}}
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
    </Modal>
  );
};

ModifyForm.propTypes = {
  myInstrument: PropTypes.object,
};

export default ModifyForm;
