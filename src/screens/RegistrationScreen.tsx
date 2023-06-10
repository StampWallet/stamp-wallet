import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

import { useForm } from 'react-hook-form';
import useOnPressHandlers from '../hooks/useOnPressHandlers';
import * as api from '../api';

import StyleBase from '../styles/StyleBase';

import CustomButton from '../components/Miscellaneous/CustomButton';
import HookFormInput from '../components/HookFormComponents/HookFormInput';
import BoxContainer from '../components/Miscellaneous/BoxContainer';

import {
  validateEmail,
  validateMatchingPasswords,
  required,
  validatePassword,
} from '../utils/validators';
import { RegistrationFormData } from '../types';
import { SERVER_ADDRESS } from '../constants/numericAndStringConstants';
import { Configuration } from '../api';
import Auth from '../database/Auth';
import { REGISTER_ROUTE } from '../constants/paths';

export default function RegistrationScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();

  const handleRegistration = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    const { email, password } = data;
    const AccountApi = new api.AccountApi(new Configuration(), SERVER_ADDRESS);

    try {
      const registerResponse = await AccountApi.createAccount({ email, password });
      const { token } = registerResponse.data;
      Auth.token = token;
      Auth.apiConfig = new Configuration({ apiKey: token });
      Auth.email = email;
      setIsSubmitting(false);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: REGISTER_ROUTE,
              params: { email },
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

  const password = watch('password');
  const passwordRepeated = watch('passwordRepeated');

  useEffect(() => {
    if (password && passwordRepeated) {
      trigger('passwordRepeated');
    }
  }, [passwordRepeated, password, trigger]);

  return (
    <SafeAreaView style={StyleBase.container}>
      <Icon
        name='arrow-left'
        size={30}
        style={StyleBase.backArrow}
        onPress={() => navigation.pop()}
        title='back'
      />
      <BoxContainer style={{ marginBottom: 25 }}>
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='name'
          placeholder='name'
          isInvalid={Boolean(errors.name)}
        />
        <HookFormInput
          control={control}
          rules={{ required, pattern: validateEmail }}
          name='email'
          placeholder='email'
          isInvalid={Boolean(errors.email)}
        />
        <HookFormInput
          control={control}
          rules={{ required, pattern: validatePassword }}
          name='password'
          placeholder='password'
          isInvalid={Boolean(errors.password)}
          secureTextEntry
        />
        <HookFormInput
          control={control}
          rules={{
            required,
            validate: () => validateMatchingPasswords(password, passwordRepeated),
          }}
          name='passwordRepeated'
          placeholder='repeat password'
          isInvalid={Boolean(errors.passwordRepeated)}
          secureTextEntry
        />
      </BoxContainer>
      <CustomButton
        onPress={handleSubmit((data: RegistrationFormData) => handleRegistration(data))}
        title='Register'
        disabled={isSubmitting}
      />
    </SafeAreaView>
  );
}
