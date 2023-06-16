import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';
import EmailConfirmationScreen from '../screens/EmailConfirmationScreen';
import CardScreen from '../screens/CardScreen/CardScreen';
import BenefitManipulationScreen from '../screens/BenefitManipulationScreen';
import CardAdditionScreen from '../screens/CardAdditionScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import LogInScreen from '../screens/LogInScreen';
import MyBusinessScreen from '../screens/MyBusiness';
import AccountScreen from '../screens/AccountScreen';
import BenefitRealizationScreen from '../screens/BenefitRealizationScreen/BenefitRealizationScreen';

const Stack = createNativeStackNavigator();

interface IAppRouter {
  initialRouteName: string;
}
export default function AppRouter({ initialRouteName }: IAppRouter) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='MapScreen' component={MapScreen} />
        <Stack.Screen name='EmailConfirmationScreen' component={EmailConfirmationScreen} />
        <Stack.Screen name='CardScreen' component={CardScreen} />
        <Stack.Screen name='CardAdditionScreen' component={CardAdditionScreen} />
        <Stack.Screen name='BenefitManipulationScreen' component={BenefitManipulationScreen} />
        <Stack.Screen name='MyBusinessScreen' component={MyBusinessScreen} />
        <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
        <Stack.Screen name='LogInScreen' component={LogInScreen} />
        <Stack.Screen name='AccountScreen' component={AccountScreen} />
        <Stack.Screen name='BenefitRealizationScreen' component={BenefitRealizationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
