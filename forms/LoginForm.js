import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useAuthentication} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {Button, Card, Input} from '@rneui/themed';
import {Alert} from 'react-native';
import styles from '../styles/Styles';

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const logIn = async (loginData) => {
    try {
      const loginResponse = await postLogin(loginData);
      await AsyncStorage.setItem('userToken', loginResponse.token);
      setIsLoggedIn(true);
      setUser(loginResponse.user);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Card containerStyle={styles.loginCard}>
      <Card.Title style={styles.cardTitle}>Login</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            textAlign="center"
            placeholderTextColor={'white'}
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textAlign="center"
            placeholderTextColor={'white'}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />

      <Button
        buttonStyle={{backgroundColor: 'black', borderRadius: 20}}
        title="Submit"
        onPress={handleSubmit(logIn)}
      />
    </Card>
  );
};

export default LoginForm;
