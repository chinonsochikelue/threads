import { useQuery } from '@tanstack/react-query';
import { getProfileById } from '@/services/profile';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Link, router } from 'expo-router';
import SupabaseImage from './SupabaseImage';
import { Feather, Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

export default function PostProfileHeader({profile}: any) {
  const { user } = useAuth();

  const {
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfileById(user!.id),
  });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text className='text-white'>Error: {error.message}</Text>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.navigate("/(auth)/login")
  };

  return (
    <View className="bg-black px-4 pt-8 pb-4">
      {/* Avatar and Edit */}
      <View className="flex-row items-center justify-between">
        <SupabaseImage
          bucket="avatars"
          path={profile?.avatar_url}
          className="w-20 h-20 rounded-full border-4 border-neutral-900"
          transform={{ width: 80, height: 80 }}
        />
        {user?.id === profile?.id ? (
          <View className="flex-row gap-2">
            <Link href="/profile/edit" asChild>
              <Pressable className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800">
                <Text className="text-white font-semibold">Edit Profile</Text>
              </Pressable>
            </Link>
            <Pressable
              onPress={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500 border border-red-700 ml-2"
            >
              <Text className="text-white font-semibold">Log out</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable className="px-4 py-2 rounded-full bg-blue-500 border border-blue-700">
            <Text className="text-white font-semibold">Follow</Text>
          </Pressable>
        )}
      </View>

      {/* Name, Username, Verified */}
      <View className="mt-4">
        <View className="flex-row items-center gap-2">
          <Text className="text-white text-2xl font-bold">{profile?.full_name || "Threads"}</Text>
          {profile?.is_verified && (
            <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
          )}
        </View>
        <Text className="text-neutral-400 text-base">@{profile?.username?.toLowerCase() || "Edit your profile"}</Text>
      </View>

      {/* Bio */}
      {profile?.bio && (
        <Text className="text-neutral-200 mt-2 leading-snug">{profile?.bio || "Add profile bio"}</Text>
      )}

      {/* Location, Website, Joined Date */}
      <View className="flex-column gap-4 mt-2">
        <View className="flex-row gap-4 mt-2">
          {profile?.location && (
            <View className="flex-row items-center gap-1 truncate">
              <Feather name="map-pin" size={16} color="#a3a3a3" />
              <Text className="text-neutral-400 text-sm truncate max-w-[125px] max-h-4">{profile.location}</Text>
            </View>
          )}
          {profile?.website && (
            <View className="flex-row items-center gap-1">
              <Feather name="link" size={16} color="#a3a3a3" />
              <Text className="text-blue-400 text-sm truncate max-w-[125px] max-h-4">{profile.website}</Text>
            </View>
          )}
        </View>
        {profile?.created_at && (
          <View className="flex-row items-center gap-1">
            <Feather name="calendar" size={16} color="#a3a3a3" />
            <Text className="text-neutral-400 text-sm">
              Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </Text>
          </View>
        )}
      </View>

      {/* Followers/Following */}
      <View className="flex-row gap-6 mt-3">
        <Text className="text-white font-semibold">
          {profile?.followers_count ?? 0}
          <Text className="text-neutral-400 font-normal"> Followers</Text>
        </Text>
        <Text className="text-white font-semibold">
          {profile?.following_count ?? 0}
          <Text className="text-neutral-400 font-normal"> Following</Text>
        </Text>
      </View>

      {/* Share Profile */}
      <Pressable className="mt-4 py-2 rounded-full border border-neutral-800 bg-neutral-900">
        <Text className="text-center text-neutral-200">Share Profile</Text>
      </Pressable>
    </View>
  );
}