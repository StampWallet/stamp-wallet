import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useOnPressHandlers from '../hooks/useOnPressHandlers';

import CustomButton from '../components/Miscellaneous/CustomButton';
import HookFormInput from '../components/HookFormComponents/HookFormInput';
import BoxContainer from '../components/Miscellaneous/BoxContainer';

import * as api from '../api';

import StyleBase from '../styles/StyleBase';

import { required, validateEmail } from '../utils/validators';
import { LoginFormData } from '../types';
import { SERVER_ADDRESS } from '../constants/numericAndStringConstants';
import { Configuration } from '../api';
import Auth from '../database/Auth';
import { CommonActions } from '@react-navigation/native';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../constants/paths';

export default function LogInScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onPressBack } = useOnPressHandlers();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogIn = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const { email, password } = data;
    const SessionsApi = new api.SessionsApi(new Configuration(), SERVER_ADDRESS);

    try {
      const loginResponse = await SessionsApi.login({ email, password });
      const { token } = loginResponse.data;
      Auth.token = token;
      Auth.apiConfig = new Configuration({ apiKey: token });
      Auth.email = email;

      setIsSubmitting(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: LOGIN_ROUTE,
            },
          ],
        })
      );
    } catch (e) {
      setIsSubmitting(false);
      console.log(e);
      console.log(e.response.data);
    }
  };

  return (
    <SafeAreaView style={StyleBase.container}>
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
        onPress={handleSubmit((data: LoginFormData) => handleLogIn(data))}
        title='Log in'
        disabled={isSubmitting}
      />
    </SafeAreaView>
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
