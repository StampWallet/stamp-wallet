import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import BoxContainer from '../components/BoxContainer'
import useOnPressHandlers from "../hooks/useOnPressHandlers";

export default function RegistrationScreen({navigation}) {
  // this use state is only a temporary solution
  // think about react hook form for this form
  // TODO READ ABOUT HANDLING PASSWORDS!!!

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatedPassword, setRepeatedPassword] = useState<string>('')

  // this yields undefined, find a workaround
  // const {onPressRegister, onPressBack} = useOnPressHandlers(navigation);

  return (
    <View style={styles.container}>
      <CustomButton onPress={() => navigation.pop()} title="back" style="back"/>
      <BoxContainer >
        <InputField placeholder="name" value={name} setValue={setName}/>
        <InputField placeholder="email" value={email} setValue={setEmail}/>
        <InputField placeholder="password" value={password} setValue={setPassword} secureTextEntry/>
        <InputField placeholder="repeat password" value={repeatedPassword} setValue={setRepeatedPassword} secureTextEntry/>
      </BoxContainer>
      <CustomButton onPress={() => navigation.push("EmailConfirmationScreen", {
        email
      })} title="Register"/>
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
