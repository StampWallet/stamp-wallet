import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useOnPressHandlers from '../hooks/useOnPressHandlers';

import CustomButton from '../components/Miscellaneous/CustomButton';
import HookFormInput from '../components/HookFormComponents/HookFormInput';
import BoxContainer from '../components/Miscellaneous/BoxContainer';

import StyleBase from '../styles/StyleBase';

import { required, validateEmail } from '../utils/validators';
import { LoginFormData } from '../types';

export default function LogInScreen({ navigation }) {
  const { onPressLogIn, onPressBack } = useOnPressHandlers();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <View style={StyleBase.container}>
      <Icon
        name='arrow-left'
        size={30}
        style={StyleBase.backArrow}
        onPress={() => onPressBack(navigation)}
      />
      <BoxContainer>
        <HookFormInput
          control={control}
          rules={{
            required,
            pattern: validateEmail,
          }}
          name='email'
          placeholder='email'
          isInvalid={Boolean(errors.email)}
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='password'
          placeholder='password'
          secureTextEntry
          isInvalid={Boolean(errors.password)}
        />
        <Text style={styles.forgotPassword}>can&apos;t log in?</Text>
      </BoxContainer>
      <CustomButton
        onPress={handleSubmit((data: LoginFormData) => onPressLogIn(navigation, data))}
        title='Log in'
      />
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
});
