import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';


export default function BenefitManipulationScreen() {
  return (
    <View style={styles.container}>
      <Text>This is benefit addition and edition screen</Text>
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
