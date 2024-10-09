// THIS IS ACTUALLY THE LOGIN SCREEN
// NAVIGATION DOESNT WORK IF THIS FILE ISNT NAMED index

import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <Text> Login screen </Text>
      <Link href="/signup">To signup</Link>
      <Link href="/(main)">To the main group</Link>
    </SafeAreaView>
  );
}


