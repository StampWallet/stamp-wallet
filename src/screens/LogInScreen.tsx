import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import useOnPressHandlers from '../hooks/useOnPressHandlers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import BoxContainer from '../components/BoxContainer';

import StyleBase from '../styles/StyleBase';

export default function LogInScreen({ navigation }) {
  // this use state is only a temporary solution
  // think about react hook form for this form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO this yields undefined on navigation, find a workaround
  // const {onPressLogIn, onPressBack} = useOnPressHandlers(navigation);

  return (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <Icon
        name='arrow-left'
        size={30}
        style={styles.backArrow}
        onPress={() => navigation.pop()}
        title='back'
      />
      <BoxContainer>
        <InputField placeholder='email' value={email} setValue={setEmail} />
        <InputField
          placeholder='password'
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <Text style={styles.forgotPassword}>can't log in?</Text>
      </BoxContainer>
      <CustomButton
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          })
        }
        title='Log in'
      />
      <Text style={styles.footer}>terms of service</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    fontSize: 16,
  },
  backArrow: { position: 'absolute', top: 10, left: 10, width: 50 },
});
