// IMPORTS
import { StyleSheet, View, Text, TextInput, Button, Image, Pressable, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { handleRegister } from '../services/DbService';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

function RegisterScreen( {navigation} ) {
  
  // ALL THE USERDATA WE NEED
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // REGISTER FUNCTION
  const register = () => { handleRegister(username, email, password) }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>Hey fresh meat!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={newText => setUserName(newText)}
          defaultValue={username}
        />
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
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={styles.registerLink}>Login Here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

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