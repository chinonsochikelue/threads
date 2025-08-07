import { useQuery } from '@tanstack/react-query';
import { getProfileById } from '@/services/profiles';
import { View, Text, ActivityIndicator, Image, Pressable } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Link } from 'expo-router';
import SupabaseImage from './SupabaseImage';

export default function ProfileHeader() {
  const { user } = useAuth();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfileById(user!.id),
  });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text className='text-white'>Error: {error.message}</Text>;
  console.log(JSON.stringify(profile, null, 2));

  return (
    <View className='p-4 gap-4'>
      <View className='flex-row items-center justify-between gap-2'>
        <View className='gap-1'>
          <Text className='text-white text-2xl font-bold'>
            {profile?.full_name}
          </Text>
          <Text className='text-neutral-200 text-lg'>{profile?.username}</Text>
        </View>

        <SupabaseImage
          bucket='avatars'
          path={profile?.avatar_url}
          className='w-20 h-20 rounded-full'
          transform={{ width: 80, height: 80 }}
        />
      </View>

      <Text className='text-neutral-200 leading-snug'>{profile?.bio}</Text>

      <View className='flex-row gap-2'>
        <Link href='/profile/edit' asChild>
          <Pressable className='flex-1 py-2 rounded-lg border-2 border-neutral-800'>
            <Text className='text-center text-neutral-200'>Edit Profile</Text>
          </Pressable>
        </Link>

        <Pressable className='flex-1 py-2 rounded-lg border-2 border-neutral-800'>
          <Text className='text-center text-neutral-200'>Share Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
