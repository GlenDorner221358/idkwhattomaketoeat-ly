import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import OnboardingScreen from './screens/onboardingScreen';
import DashboardScreen from './screens/dashboardScreen';
import HistoryScreen from './screens/historyScreen';
import CameraScreen from './screens/cameraScreen';

import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true)
      console.log("User logged in..." + user.email)
    } else {
      setLoggedIn(false)
    }
  })
    return unsubscribe 
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
        {loggedIn ? (
          <Stack.Screen name="main">
            {() => (
              <Tab.Navigator>
                <Tab.Screen name="dashboard" component={DashboardScreen} />
                <Tab.Screen name="camera" component={CameraScreen} />
                <Tab.Screen name="history" component={HistoryScreen} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="onboarding" component={OnboardingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

