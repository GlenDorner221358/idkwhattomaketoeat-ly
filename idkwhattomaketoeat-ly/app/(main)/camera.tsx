import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function CameraScreen() {
  return (
    <View>
      <Text> Camera screen </Text>
      <Link href="/">To login</Link>
    </View>
  );
}


