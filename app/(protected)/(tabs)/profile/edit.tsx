import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { router } from 'expo-router';
import UserAvatarPicker from '@/components/UserAvatarPicker';
import { getProfileById, updateProfile } from '@/services/profile';

export default function ProfileEditScreen() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfileById(user!.id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateProfile(user!.id, {
        full_name: fullName,
        username,
        bio,
        avatar_url: avatarUrl,
        location,
        website,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      router.back();
    },
  });

  useEffect(() => {
    setFullName(profile?.full_name ?? '');
    setUsername(profile?.username ?? '');
    setBio(profile?.bio ?? '');
    setAvatarUrl(profile?.avatar_url ?? '');
    setLocation(profile?.location ?? '');
    setWebsite(profile?.website ?? '');
  }, [profile?.id]);

  return (
    <ScrollView className="flex-1 bg-black px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-6 text-center">Edit Profile</Text>
      <View className="items-center mb-6">
        <UserAvatarPicker currentAvatar={avatarUrl} onUpload={setAvatarUrl} />
      </View>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        placeholderTextColor="#a3a3a3"
        className="text-white border border-neutral-800 rounded-xl p-4 mb-4 bg-neutral-900"
      />

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="User Name"
        placeholderTextColor="#a3a3a3"
        className="text-white border border-neutral-800 rounded-xl p-4 mb-4 bg-neutral-900"
      />

      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        placeholderTextColor="#a3a3a3"
        className="text-white border border-neutral-800 rounded-xl p-4 mb-4 bg-neutral-900"
        multiline
        numberOfLines={4}
        style={{ textAlignVertical: 'top' }}
      />

      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        placeholderTextColor="#a3a3a3"
        className="text-white border border-neutral-800 rounded-xl p-4 mb-4 bg-neutral-900"
      />

      <TextInput
        value={website}
        onChangeText={setWebsite}
        placeholder="Website"
        placeholderTextColor="#a3a3a3"
        className="text-white border border-neutral-800 rounded-xl p-4 mb-4 bg-neutral-900"
        autoCapitalize="none"
        keyboardType="url"
      />

      <View className="mt-8">
        <Pressable
          onPress={() => mutate()}
          className={`${
            isPending ? 'bg-white/50' : 'bg-white'
          } py-4 items-center rounded-full`}
          disabled={isPending}
        >
          <Text className="text-black font-bold text-lg">
            {isPending ? 'Saving...' : 'Save'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}