import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import PostListItem from '@/components/PostListItem';
import { getProfileById } from '@/services/profile';
import { getPostsByUserId } from '@/services/posts';
import PostProfileHeader from '@/components/postProfile';

export default function UserProfileScreen() {
  const { postUserId } = useLocalSearchParams();

  // Fetch profile data
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['profile', postUserId],
    queryFn: () => getProfileById(postUserId as string),
  });

  // Fetch user's posts
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ['posts', { user_id: postUserId }],
    queryFn: () => getPostsByUserId(postUserId as string),
  });

  if (profileLoading || postsLoading) return <ActivityIndicator />;
  if (profileError) return <Text className="text-white">Error: {profileError.message}</Text>;
  if (postsError) return <Text className="text-white">Error: {postsError.message}</Text>;

  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
        ListHeaderComponent={() => (
          <PostProfileHeader profile={profile} />
        )}
        ListEmptyComponent={() => (
          <Text className="text-neutral-400 text-center mt-10">No threads yet.</Text>
        )}
      />
    </View>
  );
}