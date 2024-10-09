// IMPORTS
import { StyleSheet, View, Image, Text, TextInput, Button, Pressable, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { handleRegister } from '../services/DbService'

function RegisterScreen( {navigation} ) {
  
  // ALL THE USERDATA WE NEED
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // REGISTER FUNCTION
  const register = () => { handleRegister(name, email, password) }

  return (
    <View style={styles.container}>
      {/* <ImageBackground 
          source={require('../assets/background1.png')} 
          style={styles.backgroundImage}
        >

      <Image 
        source={require('../assets/logoTitle.png')}
      /> */}

      <View>
        <Text>Register</Text>

        <View>
          <Text> Name: </Text>
          <TextInput
            placeholder="Seto"
            onChangeText={newText => setName(newText)}
            defaultValue={name}
          />
        </View>

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

        {/* Register button */}
        <View>
          <Pressable style={{alignItems: "center"}} onPress={register}>
            <Text style={{color: "white", fontSize: 21}}> Create Account </Text>
          </Pressable>
        </View>
      </View>


      {/* Login Navigation */}
      <View>
        <Pressable onPress={() => navigation.navigate('login')}>
            <Text style={{color: "white", fontSize: 15}}> Already have an account? </Text>
            <Text style={{color: "#D1AC00", fontSize: 15}}> Log in here </Text>
        </Pressable>
      </View>

      {/* </ImageBackground> */}
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#01172f",
  }
})