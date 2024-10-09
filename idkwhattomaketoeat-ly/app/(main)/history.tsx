import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HistoryScreen() {
  return (
    <View>
      <Text>History screen</Text>
      <Link href="/">To login</Link>
    </View>
  );
}


