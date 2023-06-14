import React, { useEffect, useState } from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/Miscellaneous/CustomButton';
import TopBar from '../components/Bars/TopBar';

import Auth from '../database/Auth';
import { FormProvider, useForm } from 'react-hook-form';
import HookFormInput from '../components/HookFormComponents/HookFormInput';
import colors from '../constants/colors';
import { required, validateEmail, validatePassword } from '../utils/validators';

import * as api from '../api';
import CenteredLoader from '../components/CenteredLoader';
import { CommonActions } from '@react-navigation/native';
import { ACCOUNT_ROUTE, REGISTER_ROUTE } from '../constants/paths';

export default function AccountScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    clearErrors,
    resetField,
  } = useForm();

  const emailWatch = watch('email');
  const passwordWatch = watch('password');
  const newPasswordWatch = watch('newPassword');

  useEffect(() => {
    if (emailWatch) {
      return;
    }

    clearErrors('email');
  }, [emailWatch, clearErrors]);

  const handleOnChangePassword = async () => {
    const isValidPassword = await trigger('password');
    const isValidNewPassword = await trigger('newPassword');

    if (!isValidNewPassword || !isValidPassword) {
      return;
    }

    setIsSubmitting(true);

    const AA = new api.AccountApi();
    const header = Auth.getAuthHeader();

    try {
      // TODO DEFINITION OF API DOESNT HANDLEIT!!!
      // const response = await AA.changePassword(
      //   { oldPassword: passwordWatch, newPassword: newPasswordWatch },
      //   header
      // );

      resetField('password');
      resetField('newPassword');
    } catch (e) {
      console.log(e.response.data);
    }

    setIsSubmitting(false);
  };

  const handleOnChangeEmail = async () => {
    if (errors.email) {
      return;
    }

    const isValid = await trigger('email');

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    const AA = new api.AccountApi();
    const header = Auth.getAuthHeader();

    try {
      const response = await AA.changeEmail({ email: emailWatch }, header);
      console.log('resp:', response.data);

      Auth.email = emailWatch;

      resetField('email');
    } catch (e) {
      console.log(e.response.data);
    }

    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        iconLeft='arrow-left'
        onPressLeft={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          })
        }
      />
      {isSubmitting ? (
        <CenteredLoader animation='loader' />
      ) : (
        <>
          <View style={styles.fieldContainer}>
            <Text style={{ fontSize: 24, alignSelf: 'center', marginBottom: 20 }}>Email</Text>
            <Text style={styles.header}>current email</Text>
            <View style={styles.fieldWrapper}>
              <Text>{Auth.email}</Text>
            </View>
            <HookFormInput
              control={control}
              rules={{ required, pattern: validateEmail }}
              name='email'
              placeholder='email'
              isInvalid={Boolean(errors.email)}
              header='new email'
            />

            <Text style={{ fontSize: 24, alignSelf: 'center', marginBottom: 20, marginTop: 10 }}>
              Password
            </Text>
            <HookFormInput
              name='password'
              control={control}
              header='current password'
              rules={{ required }}
              secureTextEntry
            />
            <HookFormInput
              name='newPassword'
              control={control}
              header='new password'
              rules={{ required, pattern: validatePassword }}
              secureTextEntry
            />
          </View>

          <CustomButton onPress={() => handleOnChangeEmail()} title='change email' />
          <CustomButton onPress={() => handleOnChangePassword()} title='change password' />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.swWhite,
  },
  fieldContainer: {
    flex: 1,
    marginTop: 80,
    width: '80%',
    // alignItems: 'center',
  },
  fieldWrapper: {
    width: '100%',
    backgroundColor: colors.swWhite,
    borderColor: colors.swUnderlineBlue,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 25,
    justifyContent: 'center',
  },
  paragraph: {
    borderBottomColor: colors.swUnderlineBlue,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});
