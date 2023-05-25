import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';
import EmailConfirmationScreen from '../screens/EmailConfirmationScreen';
import CardInfoScreen from '../screens/CardInfo';
import BenefitManipulationScreen from '../screens/BenefitManipulationScreen';
import CardAdditionScreen from '../screens/CardAdditionScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import LogInScreen from '../screens/LogInScreen';
import MyBusinessScreen from '../screens/MyBusiness';
import BenefitDescriptionScreen from '../screens/BenefitDescriptionScreen';

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
        <Stack.Screen name='CardInfoScreen' component={CardInfoScreen} />
        <Stack.Screen name='CardAdditionScreen' component={CardAdditionScreen} />
        <Stack.Screen name='BenefitManipulationScreen' component={BenefitManipulationScreen} />
        <Stack.Screen name='MyBusinessScreen' component={MyBusinessScreen} />
        <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
        <Stack.Screen name='LogInScreen' component={LogInScreen} />
        <Stack.Screen name='BenefitDescriptionScreen' component={BenefitDescriptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
