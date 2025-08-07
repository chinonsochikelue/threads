import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { dummyPosts } from '@/dummyData'
import PostListItem from '@/components/PostListItem'
import { Link } from 'expo-router'

const index = () => {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) =>
        <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <Link href='/new' className='text-blue-500 p-4 text-center text-3xl'>
          New Post
        </Link>
      )}
    />
  )
}

export default index