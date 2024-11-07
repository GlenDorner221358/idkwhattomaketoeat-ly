// App.js
import React, { useEffect, useState } from 'react';
import {
  NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

// Import Screens
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import OnboardingScreen from './screens/onboardingScreen';
import DashboardScreen from './screens/dashboardScreen';
import HistoryScreen from './screens/historyScreen';
import CameraScreen from './screens/cameraScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if it's the first launch
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          await AsyncStorage.setItem("hasLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setIsLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.log("Initialization Error:", error);
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  if (isFirstLaunch === null || isLoading) {
    return null; // You can render a splash screen or loader here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch && !user ? (
          <Stack.Screen name="onboarding" component={OnboardingScreen} />
        ) : user ? (
          <Stack.Screen name="main">
            {() => (
              <Tab.Navigator
                screenOptions={{
                  tabBarStyle: { backgroundColor: "#24282e" },
                  headerShown: false,
                }}
              >
                <Tab.Screen
                  name="history"
                  component={HistoryScreen}
                  options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="book" color={color} size={size} />
                    ),
                  }}
                />

                <Tab.Screen
                  name="dashboard"
                  component={DashboardScreen}
                  options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="home" color={color} size={size} />
                    ),
                  }}
                />

                <Tab.Screen
                  name="camera"
                  component={CameraScreen}
                  options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="camera" color={color} size={size} />
                    ),
                  }}
                />
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
