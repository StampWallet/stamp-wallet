import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useForm } from 'react-hook-form';
import useOnPressHandlers from '../hooks/useOnPressHandlers';

import StyleBase from '../styles/StyleBase';

import CustomButton from '../components/Miscellaneous/CustomButton';
import HookFormInput from '../components/HookFormComponents/HookFormInput';
import BoxContainer from '../components/Miscellaneous/BoxContainer';

import { validateEmail, validateMatchingPasswords, required } from '../utils/validators';
import { RegistrationFormData } from '../types';

export default function RegistrationScreen({ navigation }) {
  const { onPressRegister } = useOnPressHandlers();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');
  const passwordRepeated = watch('passwordRepeated');

  return (
    <View style={StyleBase.container}>
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
          rules={{ required }}
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
        onPress={handleSubmit((data: RegistrationFormData) => onPressRegister(navigation, data))}
        title='Register'
      />
    </View>
  );
}
