import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold_Italic } from '@expo-google-fonts/roboto';

import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': Roboto_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CustomButton
        onPress={() => {
          navigation.push('LogInScreen');
        }}
        title='Sign in'
      />
      <Text style={{ fontFamily: 'Roboto-Regular' }}>asdasdasdas</Text>
      <CustomButton
        onPress={() => {
          navigation.push('RegistrationScreen');
        }}
        title='Register'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    height: 60,
    margin: 12,
    padding: 10,
    fontSize: 18,
  },
});
