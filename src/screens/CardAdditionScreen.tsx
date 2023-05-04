import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';


export default function CardAdditionScreen() {
  return (
    <View style={styles.container}>
      <Text>This is card addition screen screen</Text>
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
