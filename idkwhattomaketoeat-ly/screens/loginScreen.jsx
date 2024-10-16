// IMPORTS
import { StyleSheet, View, Text, TextInput, Button, Image, Pressable, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { handleLogin } from '../services/DbService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

function LoginScreen( {navigation} ) {

  // USERS EMAIL AND PASSWORD
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //LOGIN FUNCTION
  const login = () => { handleLogin(email, password) }

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboarded = await AsyncStorage.getItem('onboarded');
        if (onboarded !== 'true') {
          await AsyncStorage.setItem('onboarded', 'true');
          navigation.navigate('onboarding');
        }
      } catch (error) {
        console.error('Failed to check onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome Back!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={newText => setEmail(newText)}
          defaultValue={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          onChangeText={newText => setPassword(newText)}
          defaultValue={password}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.registerLink}>Register Here</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={() => navigation.navigate('onboarding')}>
                <Text style={{color: "#D1AC00", fontSize: 15}}> Onboarding screen </Text>
          </Pressable>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363D45',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#e8f17f',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: height * 0.07,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    width: '80%',
    height: height * 0.07,
    backgroundColor: '#e8f17f',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    color: '#e8f17f',
    fontSize: width * 0.04,
  },
  registerLink: {
    color: '#8cbcb9',
    fontSize: width * 0.04,
    marginLeft: 5,
  },
})