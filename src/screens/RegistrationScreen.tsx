import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import BoxContainer from '../components/BoxContainer';
import useOnPressHandlers from '../hooks/useOnPressHandlers';

export default function RegistrationScreen({ navigation }) {
  // this use state is only a temporary solution
  // think about react hook form for this form
  // TODO READ ABOUT HANDLING PASSWORDS!!!

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');

  // this yields undefined, find a workaround
  // const {onPressRegister, onPressBack} = useOnPressHandlers(navigation);

  return (
    <View style={styles.container}>
      <Icon
        name={'arrow-left'}
        size={30}
        style={styles.backButton}
        onPress={() => navigation.pop()}
        title="back"
      />
      <BoxContainer>
        <InputField placeholder="name" value={name} setValue={setName} />
        <InputField placeholder="email" value={email} setValue={setEmail} />
        <InputField
          placeholder="password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <InputField
          placeholder="repeat password"
          value={repeatedPassword}
          setValue={setRepeatedPassword}
          secureTextEntry
        />
      </BoxContainer>
      <CustomButton
        onPress={() =>
          navigation.push('EmailConfirmationScreen', {
            email,
          })
        }
        title="Register"
      />
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    alignItems: 'center',
    borderRadius: 10,
  },
});
