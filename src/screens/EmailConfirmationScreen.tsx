import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/Miscellaneous/CustomButton';
import BoxContainer from '../components/Miscellaneous/BoxContainer';

export default function EmailConfirmationScreen({ navigation, route }) {
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const { email } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          })
        }
        title='back'
      />
      <BoxContainer>
        <Text style={styles.confirmationHead}>Your account has been successfully created!</Text>
        <Text style={styles.confirmationBody}>
          Please verify your email address by clicking the link sent to provided email.
        </Text>
      </BoxContainer>
      <Text style={styles.email}>{email}</Text>
      <BoxContainer style={styles.buttonBox}>
        <CustomButton onPress={() => navigation.replace('HomeScreen')} title='Log out' />
        <CustomButton onPress={() => setIsChangingEmail(true)} title='Change email' />
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
