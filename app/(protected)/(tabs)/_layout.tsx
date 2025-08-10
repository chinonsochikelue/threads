import { router, Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name='home' size={size} color={color} />
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