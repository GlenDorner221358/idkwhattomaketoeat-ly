// IMPORTS
import { StyleSheet, View, Text, TextInput, Button, Image, Pressable, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { handleLogin } from '../services/DbService';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    
      <View style={styles.container}>
        {/* <ImageBackground 
          source={require('../assets/background1.png')} 
          style={styles.backgroundImage}
        > */}

        {/* <Image 
          source={require('../assets/logoTitle.png')}
        /> */}

        <View>
          <Text>Log In</Text>

          <View>
            <Text> Email: </Text>
            <TextInput
              placeholder="Kaiba@KaibaCorp.co.za"
              onChangeText={newText => setEmail(newText)}
              defaultValue={email}
            />
          </View>

          <View>
            <Text> Password: </Text>
            <TextInput
              placeholder="BlueEyesWhiteDragon"
              onChangeText={newText => setPassword(newText)}
              defaultValue={password}
              secureTextEntry={true}
            />
          </View>

          {/* Login button */}
          <View>
            <Pressable style={{alignItems: "center"}} onPress={login}>
              <Text style={{color: "white", fontSize: 21}}> Log-In </Text>
            </Pressable>
          </View>
        </View>

      {/* Register navigation button */}
        <View>
          <Pressable onPress={() => navigation.navigate('register')}>
              <Text style={{color: "white", fontSize: 15}}> Don't have an account? </Text>
              <Text style={{color: "#D1AC00", fontSize: 15}}> Register Here </Text>
          </Pressable>
        </View>

      {/* </ImageBackground> */}

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#01172f",
  }
})