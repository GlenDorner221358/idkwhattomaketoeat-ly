import { Stack, Tabs } from 'expo-router';

export default function MainLayout() {
  return (
    <Tabs>
        {/* INDEX IS THE DASHBOARD SCREEN */}
        {/* SAME ISSUE AS LOGIN */}
        <Tabs.Screen name="index" options={{headerShown: false}} />
        <Tabs.Screen name="camera" options={{headerShown: false}} />
        <Tabs.Screen name="history" options={{headerShown: false}} />
    </Tabs>
  );
}
