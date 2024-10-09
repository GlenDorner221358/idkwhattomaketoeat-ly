import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <View>
      <Text>Dashboard screen</Text>
      <Link href="/">To login</Link>
    </View>
  );
}


