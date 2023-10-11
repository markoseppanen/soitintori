import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Button, Card, Input} from '@rneui/themed';
import {Alert} from 'react-native';
import {PropTypes} from 'prop-types';
import styles from '../styles/Styles';

const RegisterForm = ({setToggleRegister}) => {
  const {postUser, checkUsername} = useUser();

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
      address: '',
      phonenumber: '',
      postal_code: '',
    },
    mode: 'onBlur',
  });

  const register = async (registerData) => {
    console.log('Registering: ', registerData);
    const oikeaData = {
      username: registerData.username,
      password: registerData.password,
      email: registerData.email,
      full_name: JSON.stringify({
        full_name: registerData.full_name,
        address: registerData.address,
        phonenumber: registerData.phonenumber,
        postal_code: registerData.postal_code,
      }),
    };
    try {
      delete oikeaData.confirm_password;
      const registerResponse = await postUser(oikeaData);
      Alert.alert('Registering was successful', registerResponse.message);
      setToggleRegister(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Card containerStyle={styles.loginCard}>
      <Card.Title style={styles.cardTitle}>Register</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'minimum length is 3 characters'},
          validate: async (value) => {
            try {
              const isAvailable = await checkUsername(value);
              return isAvailable ? isAvailable : 'Username taken';
            } catch (error) {
              console.error(error);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholderTextColor={'white'}
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholderTextColor={'white'}
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'min length is 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="full_name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholderTextColor={'white'}
            errorMessage={errors.full_name?.message}
          />
        )}
        name="full_name"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'min length is 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholderTextColor={'white'}
            errorMessage={errors.address?.message}
          />
        )}
        name="address"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 5, message: 'min length is 5 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="postal code"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholderTextColor={'white'}
            errorMessage={errors.postal_code?.message}
          />
        )}
        name="postal code"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 8, message: 'min length is 8 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="phonenumber"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholderTextColor={'white'}
            errorMessage={errors.phonenumber?.message}
          />
        )}
        name="phonenumber"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 5, message: 'minimum length is 5 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'white'}
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
            return value === password ? true : 'Passwords dont match!';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'white'}
            errorMessage={errors.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />

      <Button
        buttonStyle={{backgroundColor: 'black', borderRadius: 6}}
        title="Submit"
        onPress={handleSubmit(register)}
      />
    </Card>
  );
};

RegisterForm.propTypes = {
  setToggleRegister: PropTypes.func,
};

export default RegisterForm;
