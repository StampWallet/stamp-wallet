import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';

import TopBar from '../components/Bars/TopBar';

export default function MapScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar iconLeft='arrow-left' onPressLeft={() => navigation.pop()} />
      <Text>This is map view</Text>
      <StatusBar barStyle='default' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', //temp
    alignItems: 'center',
    justifyContent: 'center',
  },
});
