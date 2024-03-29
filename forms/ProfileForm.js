import React, {useContext} from 'react';
import {useUser} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';
import {Card, Button, Input} from '@rneui/themed';
import {Alert} from 'react-native';
import {PropTypes} from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import styles from '../styles/Styles';

const ProfileForm = ({user}) => {
  const {putUser, checkUsername, getUserByToken} = useUser();
  const {setUser} = useContext(MainContext);
  //console.log('ProfileForm', user);
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      ...user,
      username: '',
      password: '',
      confirm_password: '',
      full_name: '',
      email: '',
      address: '',
      phonenumber: '',
      postal_code: '',
    },
    mode: 'onBlur',
  });

  const update = async (updateData) => {
    console.log('Updating: ', updateData);
    const updatedData = {
      username: updateData.username,
      password: updateData.password,
      email: updateData.email,
      full_name: JSON.stringify({
        full_name: updateData.full_name,
        address: updateData.address,
        phonenumber: updateData.phonenumber,
        postal_code: updateData.postal_code,
      }),
    };
    try {
      delete updatedData.confirm_password;
      for (const [i, value] of Object.entries(updatedData)) {
        console.log(i, value);
        if (value === '') {
          delete updatedData[i];
        }
      }
      const token = await AsyncStorage.getItem('userToken');
      const updateResult = await putUser(updatedData, token);
      console.log('registeration result', updateResult);
      Alert.alert('Success', updateResult.message);
      const userData = await getUserByToken(token);
      setUser(userData);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Card>
      <Card.Title style={styles.cardTitle}>Update Profile</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'min length is 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.full_name?.message}
          />
        )}
        name="full_name"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 8, message: 'min length is 8 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Phonenumber"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.phonenumber?.message}
          />
        )}
        name="phonenumber"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'min length is 3 characters'},
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
          minLength: {value: 3, message: 'min length is 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Postal code"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.postal_code?.message}
          />
        )}
        name="postal_code"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 5, message: 'min length is 5 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: (value) => {
            const {password} = getValues();
            if (password.length < 5) {
              return;
            }
            return value === password ? true : 'Passwords dont match!';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />

      <Button
        title="Update!"
        buttonStyle={{backgroundColor: 'black', borderRadius: 6}}
        onPress={handleSubmit(update)}
      />
    </Card>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
};

export default ProfileForm;
