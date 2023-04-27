import { StyleSheet, Text, View, StatusBar } from 'react-native';


export default function HomeScreen() {
  return (

    <View style={styles.container}>
      <Text>This is home screen</Text>
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