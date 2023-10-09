import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import {Button} from '@rneui/base';
import {Card} from '@rneui/themed';
import styles from '../styles/Styles';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleRegister, setToggleRegister] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      //console.log('token', token);
      const userData = await getUserByToken(token);
      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      console.log('checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ScrollView style={styles.containerLogin}>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        {toggleRegister ? (
          <RegisterForm setToggleRegister={setToggleRegister} />
        ) : (
          <LoginForm />
        )}
        <Card containerStyle={styles.loginCard}>
          {toggleRegister ? (
            <Card.Title setToggleRegister={setToggleRegister}>
              Already Registered? Login Here
            </Card.Title>
          ) : (
            <Card.Title>Register Here!</Card.Title>
          )}

          <Button
            onPress={() => {
              setToggleRegister(!toggleRegister);
            }}
          >
            {toggleRegister ? 'Login' : 'Register'}
          </Button>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
