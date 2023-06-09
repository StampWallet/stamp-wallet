import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import CustomButton from '../components/Miscellaneous/CustomButton';
import StyleBase from '../styles/StyleBase';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={StyleBase.container}>
      <Text>Welcome to Stamp-Wallet!</Text>
      <CustomButton
        onPress={() => {
          navigation.push('LogInScreen');
        }}
        title='Sign in'
      />
      <CustomButton
        onPress={() => {
          navigation.push('RegistrationScreen');
        }}
        title='Register'
      />
    </SafeAreaView>
  );
}
