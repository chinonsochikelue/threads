import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const NewPostScreen = () => {
  const [text, setText] = useState('');


  return (
    <SafeAreaView
      edges={['bottom']}
      className='p-4 flex-1'
    >
      <KeyboardAvoidingView
        className='flex-1'
        behavior={
          Platform.OS === 'ios' ? 'padding' : 'height'
        }
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 140 : 0
        }
      >
        <Text className='text-white text-lg font-bold'>Username</Text>

        <TextInput
          placeholder='What is on your mind?'
          className='text-white text-lg placeholder:text-gray-500'
          multiline
          numberOfLines={4}
        />

        <View className='mt-auto'>
          <Pressable onPress={() => console.log("Post: ")} className='bg-white self-end rounded-full px-4 p-1'>
            <Text className='text-black font-bold'>Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default NewPostScreen