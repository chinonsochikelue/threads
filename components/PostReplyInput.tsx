import { View, TextInput, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SupabaseImage from './SupabaseImage';

export default function PostReplyInput({ postId }: { postId: string }) {
  const [text, setText] = useState('');
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      createPost({ content: text, user_id: user!.id, parent_id: postId }),
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      // You can show a toast or alert here
      console.error(error);
    },
  });

  return (
    <View className="p-4 pt-0 bg-black">
      <View className="flex-row items-center gap-3 bg-neutral-900 p-3 rounded-xl">
        <SupabaseImage
          bucket="avatars"
          path={profile?.avatar_url}
          className="w-10 h-10 rounded-full"
          transform={{ width: 40, height: 40 }}
        />
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add to thread..."
          placeholderTextColor="#a3a3a3"
          className="flex-1 text-white text-base"
          multiline
        />
        <Pressable
          onPress={() => mutate()}
          disabled={isPending || text.trim().length === 0}
          className={`ml-2 ${isPending || text.trim().length === 0 ? 'opacity-50' : ''}`}
        >
          <AntDesign
            name="pluscircle"
            size={28}
            color={text.trim().length === 0 ? '#6b7280' : '#fff'}
          />
        </Pressable>
      </View>
    </View>
  );
}