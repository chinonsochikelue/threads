import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/providers/AuthProvider';
import { Entypo } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { createPost } from '@/services/posts';
import * as ImagePicker from 'expo-image-picker';
import SupabaseImage from '@/components/SupabaseImage';

export default function NewPostScreen() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const { user, profile } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      let imagePath = undefined;
      if (image) {
        imagePath = await uploadImage();
      }

      return createPost({
        content: text,
        user_id: user!.id,
        images: imagePath ? [imagePath] : [],
      });
    },
    onSuccess: () => {
      setText('');
      setImage(null);
      router.back();
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());

    const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
    const path = `${Date.now()}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from('media')
      .upload(path, arraybuffer, {
        contentType: image.mimeType ?? 'image/jpeg',
      });
    if (uploadError) {
      throw uploadError;
    }

    return data.path;
  };

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-black px-4">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 0}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between py-2">
          <Text className="text-white text-xl font-bold">Create Thread</Text>
          <Pressable
            onPress={() => mutate()}
            className={`${
              isPending ? 'bg-white/50' : 'bg-white'
            } px-5 py-2 rounded-full`}
            disabled={isPending || !text.trim()}
          >
            <Text className="text-black font-bold text-base">
              {isPending ? 'Posting...' : 'Post'}
            </Text>
          </Pressable>
        </View>

        {/* User and Input */}
        <View className="flex-row gap-3 mt-4">
          <SupabaseImage
            bucket="avatars"
            path={profile?.avatar_url}
            className="w-12 h-12 rounded-full"
            transform={{ width: 48, height: 48 }}
          />
          <View className="flex-1">
            <Text className="text-white font-bold text-base mb-1">
              {profile?.full_name}
            </Text>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Start a thread..."
              placeholderTextColor="#a3a3a3"
              className="text-white text-lg min-h-[80px] mb-2"
              multiline
              numberOfLines={4}
              style={{ textAlignVertical: 'top' }}
            />
            {image && (
              <Image
                source={{ uri: image.uri }}
                className="w-full rounded-xl mb-3"
                style={{
                  aspectRatio: image.width / image.height,
                  maxHeight: 250,
                  backgroundColor: '#171717',
                }}
              />
            )}
            <View className="flex-row items-center gap-2 mt-2">
              <Pressable
                onPress={pickImage}
                className="p-2 rounded-full bg-neutral-900"
              >
                <Entypo name="images" size={22} color="#a3a3a3" />
              </Pressable>
              {image && (
                <Pressable
                  onPress={() => setImage(null)}
                  className="p-2 rounded-full bg-neutral-900"
                >
                  <Entypo name="cross" size={22} color="#ef4444" />
                </Pressable>
              )}
            </View>
            {error && (
              <Text className="text-red-500 text-sm mt-2">{error.message}</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}