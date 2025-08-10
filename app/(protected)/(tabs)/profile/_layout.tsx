import { Stack, useLocalSearchParams } from 'expo-router';

export default function ProfileLayout() {
  const { postUserId, username } = useLocalSearchParams();

  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Profile' }} />
      <Stack.Screen name='edit' options={{ title: 'Edit Profile' }} />
      <Stack.Screen
        name='[postUserId]'
        options={{
          title: username
            ? `${username?.toLowerCase()} profile`
            : 'User profile',
        }}
      />
    </Stack>
  );
}