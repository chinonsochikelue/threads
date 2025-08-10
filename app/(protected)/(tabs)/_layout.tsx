import { router, Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image
              source={require('@/assets/images/icon.png')} // replace with your Threads-like logo
              style={{ width: 120, height: 100, resizeMode: 'contain', marginTop: -80, marginBottom: -60 }}
            />
          ),
          headerStyle: {
            backgroundColor: '#000', // Threads dark background
          },
          headerShadowVisible: false, // Removes bottom border shadow
          headerTitleAlign: 'center', // Logo centered
          headerTintColor: '#fff', // Icons white
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => (
            <Feather name='search' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='plus'
        options={{
          title: 'Plus',
          tabBarIcon: ({ size, color }) => (
            <Feather name='plus' size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/new');
          },
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          title: 'Notifications',
          tabBarIcon: ({ size, color }) => (
            <Feather name='heart' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name='user' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}