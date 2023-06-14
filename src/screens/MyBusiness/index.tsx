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
  city: 'Wydzial Matematyczny i Informatyczny Jot U',
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
  //potrzeba TopBar, powrot
  return (
    <SafeAreaView style={StyleBase.container}>
      <Text style={styles.stepCounter}>{`Step ${step}/2`}</Text>
      {step > 1 && (
        <Icon
          name='arrow-left'
          size={30}
          style={StyleBase.backArrow}
          onPress={() => setCurrentStep((prev) => prev - 1)}
          title='back'
        />
      )}
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
