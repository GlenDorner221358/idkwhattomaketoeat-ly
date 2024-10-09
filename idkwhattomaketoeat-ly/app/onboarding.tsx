import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Text> Onboarding screen</Text>
      <Link href="/signup">View details</Link>
    </View>
  );
}


