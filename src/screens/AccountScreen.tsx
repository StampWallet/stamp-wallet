import React, { useEffect, useState } from 'react';

import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
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
import { Snackbar } from 'react-native-paper';

export default function AccountScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [snackbarState, setSnackbarState] = useState<{
    visible: boolean;
    message: string;
    color: string;
  }>({
    visible: false,
    message: '',
    color: '',
  });

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
      // TODO DEFINITION OF API DOESNT HANDLE IT!!!
      // const response = await AA.changePassword(
      //   { oldPassword: passwordWatch, newPassword: newPasswordWatch },
      //   header
      // );

      resetField('password');
      resetField('newPassword');
      setSnackbarState({
        color: colors.swDarkGreen,
        message: 'Password was successfully changed.',
        visible: true,
      });
    } catch (e) {
      setSnackbarState({
        color: colors.swRed,
        message: 'Something went wrong.',
        visible: true,
      });
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
      setSnackbarState((prev) => ({
        color: colors.swDarkGreen,
        message: 'Email has been successfully changed.',
        visible: true,
      }));
      resetField('email');
    } catch (e) {
      if (e.response.data.status === 'INVALID_REQUEST') {
        setSnackbarState((prev) => ({
          color: colors.swRed,
          message: 'Something went wrong.',
          visible: true,
        }));
      } else {
        setSnackbarState((prev) => ({
          color: colors.swDarkGreen,
          message: 'Email already exists!.',
          visible: true,
        }));
      }
    }

    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='default' />
      <TopBar
        iconLeft='arrow-left'
        onPressLeft={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          })
        }
      />
      <Snackbar
        visible={snackbarState.visible}
        onDismiss={() => setSnackbarState({ ...snackbarState, visible: false })}
        wrapperStyle={{ position: 'absolute', top: 15, left: 0, zIndex: 999 }}
        style={{ backgroundColor: snackbarState.color }}
        duration={Snackbar.DURATION_MEDIUM}
        action={{
          label: 'OK',
          onPress: () => setSnackbarState({ ...snackbarState, visible: false }),
        }}
      >
        <Text style={{ color: colors.swWhite }}>{snackbarState.message}</Text>
      </Snackbar>
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
