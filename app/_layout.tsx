import '../globals.css';

import { Slot } from 'expo-router';

import { ThemeProvider, DarkTheme } from '@react-navigation/native';

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'white',
    card: '#101010',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={myTheme}>
      <Slot />
    </ThemeProvider>
  );
}