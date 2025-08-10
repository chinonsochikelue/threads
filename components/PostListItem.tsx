import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SupabaseImage from './SupabaseImage';
import { Link, useRouter } from 'expo-router';

dayjs.extend(relativeTime);

export default function PostListItem({
  post,
  isLastInGroup = true,
}: {
  post: any;
  isLastInGroup?: boolean;
}) {
  const router = useRouter();

  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Pressable
        className={`flex-row p-4 ${isLastInGroup ? 'border-b border-gray-800/70' : ''}`}
      >
        {/* User Avatar and Thread Line */}
        <View className="mr-3 items-center gap-2">
          <SupabaseImage
            bucket="avatars"
            path={post.user.avatar_url}
            className="w-12 h-12 rounded-full"
            transform={{ width: 50, height: 50 }}
          />
          {!isLastInGroup && (
            <View className="w-[3px] flex-1 rounded-full bg-neutral-700 translate-y-2" />
          )}
        </View>

        {/* Post Content */}
        <View className="flex-1">
          {/* User Info */}
          <View className="flex-row items-center">
            <Text className="text-white font-bold mr-2">{post.user.full_name}</Text>
            <Pressable onPress={() => router.push(`/profile/${post.user.id}?username=${encodeURIComponent(post.user.username)}`)}>
              <Text className="text-neutral-400">@{post.user.username.toLowerCase()}</Text>
            </Pressable>
            <Text className="text-gray-500 ml-2">{dayjs(post.created_at).fromNow()}</Text>
          </View>

          {/* Post Text */}
          <Text className="text-white mt-2 mb-3">{post.content}</Text>

          {/* Post Images */}
          {Array.isArray(post.images) && post.images.length > 0 && (
            <View className="flex-row gap-2 mt-2">
              {post.images.map((image: string) => (
                <SupabaseImage
                  key={image}
                  bucket="media"
                  path={image}
                  className="w-full aspect-square rounded-lg"
                  transform={{ width: 500, height: 500 }}
                />
              ))}
            </View>
          )}

          {/* Interaction Buttons */}
          <View className="flex-row gap-6 mt-2">
            <Pressable className="flex-row items-center">
              <Ionicons name="heart-outline" size={20} color="#d1d5db" />
              <Text className="text-gray-300 ml-2">{post.likes_count ?? 0}</Text>
            </Pressable>
            <Pressable className="flex-row items-center">
              <Ionicons name="chatbubble-outline" size={20} color="#d1d5db" />
              <Text className="text-gray-300 ml-2">{post?.replies?.[0]?.count ?? 0}</Text>
            </Pressable>
            <Pressable className="flex-row items-center">
              <Ionicons name="repeat-outline" size={20} color="#d1d5db" />
              <Text className="text-gray-300 ml-2">{post.reposts_count ?? 0}</Text>
            </Pressable>
            <Pressable>
              <Ionicons name="paper-plane-outline" size={20} color="#d1d5db" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}