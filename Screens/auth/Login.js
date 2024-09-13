import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../Actions/auth/login'
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const loginState = useSelector((state) => state.login.isAuthenticated);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChangeUsername = (value) => setFormData({ ...formData, username: value });
  const onChangePassword = (value) => setFormData({ ...formData, password: value });

  const handleSubmit = async () => {
    await dispatch(login(username, password));
  };

  useEffect(() => {
    if (loginState) {
      navigation.navigate('Home'); // Adjust the route name based on your navigation setup
    }
  }, [loginState, navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/BATlogo.png')} style={styles.logo} />
      <View style={styles.form}>
        <TextInput
          onChangeText={onChangeUsername}
          value={username}
          style={styles.input}
          placeholder="Username"
        />
        <TextInput
          onChangeText={onChangePassword}
          value={password}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 288, // equivalent to 18rem
    height: 288,
    marginBottom: 30,
    resizeMode:'contain',
  },
  form: {
    width: '80%',
    maxWidth: 480, // equivalent to 30rem
  },
  input: {
    padding: 10, // equivalent to p-2
    borderBottomWidth: 2,
    borderBottomColor: '#002667',
    marginBottom: 10,
    transitionDuration: '300ms',
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#002667',
    height: 48, // equivalent to h-3rem
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
