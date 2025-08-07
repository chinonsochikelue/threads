import React from 'react'
import { Stack } from 'expo-router'

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='new'
        options={{
          title: 'New Thread',
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
    </Stack>
  )
}
