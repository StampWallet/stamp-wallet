import React, {useState} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import useOnPressHandlers from "../hooks/useOnPressHandlers";

import CustomButton from '../components/CustomButton'
import InputField from "../components/InputField";
import BoxContainer from "../components/BoxContainer";

export default function LogInScreen({navigation}) {
  // this use state is only a temporary solution
  // think about react hook form for this form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // TODO this yields undefined on navigation, find a workaround
  // const {onPressLogIn, onPressBack} = useOnPressHandlers(navigation);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <CustomButton onPress={() => navigation.pop()} title="back" style="back"/>
      <BoxContainer>
        <InputField placeholder="email" value={email} setValue={setEmail}/>
        <InputField placeholder="password" value={password} setValue={setPassword} secureTextEntry/>
        <Text style={styles.forgotPassword}>can't log in?</Text>
      </BoxContainer>
      <CustomButton onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: "MainScreen"}]
      })} title="Log in"/>
      <Text style={styles.footer}>terms of service</Text>
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
  forgotPassword: {
    width: '100%',
    textAlign: "right"
  },
  footer: {
    position: "absolute",
    bottom: 15,
    fontSize: 16,
  }
});
