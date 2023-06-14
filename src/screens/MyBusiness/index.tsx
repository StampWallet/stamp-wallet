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

  const { ...methods } = useForm({
    defaultValues: mockFormData,
  });
  const { handleSubmit } = methods;

  const onPressStepForm = (data) => {
    if (step < 2) {
      setBusinessRegistrationFormValues(data);
      setCurrentStep((prev) => prev + 1);
      return;
    }
    navigation.push('MainScreen');
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
