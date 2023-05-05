import React from 'react';
import { StyleSheet, View } from "react-native";

import CustomButton from '../components/CustomButton'

export default function HomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <CustomButton onPress={() => {navigation.push("LogInScreen")}} title="Sign in"/>
      <CustomButton onPress={() => {navigation.push("RegistrationScreen")}} title="Register"/>
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
