import { Stack, Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      {/* index is actually login */}
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="signup" options={{headerShown: false}} />
      <Stack.Screen name="onboarding" options={{headerShown: false}} />
      <Stack.Screen name="(main)" options={{headerShown: false}} />
    </Stack>
  );
}
