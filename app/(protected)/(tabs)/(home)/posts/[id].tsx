import PostListItem from '@/components/PostListItem';
import PostReplyInput from '@/components/PostReplyInput';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { getPostById, getPostsReplies } from '@/services/posts';
import PostDetails from '@/components/PostDetails';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostById(id),
    staleTime: 1000 * 60 * 5,
  });

  const { data: parent } = useQuery({
    queryKey: ['posts', post?.parent_id],
    queryFn: () => getPostById(post?.parent_id || ''),
    enabled: !!post?.parent_id,
  });

  const { data: replies } = useQuery({
    queryKey: ['posts', id, 'replies'],
    queryFn: () => getPostsReplies(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className='text-white'>{error.message}</Text>;
  }

  return (
    <View className='flex-1 '>
      <FlatList
        data={replies || []}
        renderItem={({ item }) => <PostListItem post={item} />}
        ListHeaderComponent={
          <>
            {parent && <PostListItem post={parent} isLastInGroup={false} />}
            <PostDetails post={post} />
            <Text className='text-white text-lg font-bold p-4 border-b border-neutral-800'>
              Replies
            </Text>
          </>
        }
      />
      <PostReplyInput postId={id} />
    </View>
  );
}