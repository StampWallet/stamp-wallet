import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from '../../components/Miscellaneous/CustomButton';
import PersonalDataForm from './PersonalDataForm';
import BusinessDataForm from './BusinessDataForm';

import { BusinessRegistrationFormData } from '../../types';
import StyleBase from '../../styles/StyleBase';
import BusinessImagesForm from './BusinessImagesForm';
import { CommonActions } from '@react-navigation/native';
import { MAIN_ROUTE } from '../../constants/paths';
import colors from '../../constants/colors';

import * as api from '../../api';
import Auth from '../../database/Auth';

const mockFormData = {
  name: 'bill',
  surname: 'macGill',
  email: 'callme@wp.pl',
  phoneNumber: '+48518274407',
  NIP: '1231456',
  KRS: '12312',
  REGON: '123213',
  businessName: 'pay a bill @ bill',
  businessAddress: 'hrumczakowa 41/12',
  postalCode: '21-37',
  city: 'WChUJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
};

const getTitle = (step: number) => {
  if (step === 1) {
    return 'To business customisation';
  }
  return 'Create business';
};

export default function MyBusinessScreen({ navigation }) {
  const [step, setCurrentStep] = useState(1);
  const [businessRegistrationFormValues, setBusinessRegistrationFormValues] =
    useState<BusinessRegistrationFormData>(null);
  const [snackbarState, setSnackbarState] = useState<{
    visible: boolean;
    message: string;
    color: string;
  }>({
    visible: false,
    message: '',
    color: '',
  });

  const { ...methods } = useForm({
    defaultValues: mockFormData,
  });
  const { handleSubmit } = methods;

  const onPressStepForm = async (data) => {
    if (step < 2) {
      setBusinessRegistrationFormValues(data);
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const createAccountPayload = {
      name: data.businessName,
      address: `${data.address}, ${data.city}`,
      gpsCoordinates: '+48.8577+002.295/',
      nip: data.nip,
      krs: data.krs,
      regon: data.regon,
      ownerName: data.name,
    };

    const header = Auth.getAuthHeader();
    let response = null;

    try {
      const BA = new api.BusinessApi();
      response = await BA.createBusinessAccount(createAccountPayload, header);
    } catch (e) {
      const { status } = e.response;
      if (status === 'UNAUTHORIZED') {
        setSnackbarState({
          color: colors.swRed,
          message: 'Unauthorized credentials.',
          visible: true,
        });
      } else if (status === 'ALREADY_EXISTS') {
        setSnackbarState({
          color: colors.swRed,
          message: 'Business already exists!.',
          visible: true,
        });
      } else {
        setSnackbarState({
          color: colors.swRed,
          message: 'Something went wrong.',
          visible: true,
        });
      }
    }

    // TODO FINISH BUSINESS CREATION
    if (response) {
      const { publicId, bannerImageId, iconImageId } = response.data;
    }
  };

  const handleArrowPress = () => {
    if (step === 1) {
      return navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: MAIN_ROUTE }],
        })
      );
    }

    return setCurrentStep((prev) => prev - 1);
  };

  return (
    <SafeAreaView style={StyleBase.container}>
      <Text style={styles.stepCounter}>{`Step ${step}/2`}</Text>
      <Icon
        name='arrow-left'
        size={30}
        style={StyleBase.backArrow}
        onPress={() => handleArrowPress()}
        title='back'
      />
      <FormProvider {...methods}>
        {/*{step === 1 && <PersonalDataForm />}*/}
        {step === 1 && <BusinessDataForm />}
        {step === 2 && <BusinessImagesForm />}
        <CustomButton onPress={handleSubmit(onPressStepForm)} title={getTitle(step)} />
      </FormProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepCounter: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 24,
    right: 30,
    textDecorationLine: 'underline',
  },
});
