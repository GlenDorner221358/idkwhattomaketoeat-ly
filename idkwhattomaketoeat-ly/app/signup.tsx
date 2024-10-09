import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SignupScreen() {
  return (
    <View>
      <Text> Signup screen </Text>
      <Link href="/">To login</Link>
    </View>
  );
}


