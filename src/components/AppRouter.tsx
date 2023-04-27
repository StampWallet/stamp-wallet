import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import MainScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator();
export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home screen" component={HomeScreen} />
        <Stack.Screen name="Main screen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
