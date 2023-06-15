import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/Miscellaneous/CustomButton';
import BoxContainer from '../components/Miscellaneous/BoxContainer';
import TopBar from '../components/Bars/TopBar';

export default function EmailConfirmationScreen({ navigation, route }) {
  const { email } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='default' />
      <TopBar
        iconLeft='arrow-left'
        onPressLeft={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          })
        }
      />
      <BoxContainer>
        <Text style={styles.confirmationHead}>Your account has been successfully created!</Text>
        <Text style={styles.confirmationBody}>
          To start using the StampWallet, please verify your email address by clicking the link sent
          to your email. Otherwise, app functionalities will not be available.
        </Text>
      </BoxContainer>
      <Text style={styles.email}>{email}</Text>
      <BoxContainer style={styles.buttonBox}>
        <CustomButton onPress={() => navigation.replace('HomeScreen')} title='Log out' />
      </BoxContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationHead: {
    width: '125%',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  confirmationBody: {
    fontSize: 14,
    textAlign: 'center',
  },
  email: {
    borderBottomColor: '#50AAEB',
    borderBottomWidth: 1,
    width: '75%',
    textAlign: 'center',
  },
  buttonBox: {
    width: '100%',
  },
});
