import React from 'react';
import AppRouter from './src/routes/AppRouter';

// https://stackoverflow.com/a/74980654
import 'react-native-url-polyfill/auto';

export default function App() {
  return <AppRouter initialRouteName='HomeScreen' />;
}
