import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BoxContainer from '../components/BoxContainer';
import HookFormInput from '../components/HookFormInput';
import CustomButton from '../components/CustomButton';

import { BusinessRegistrationFormData } from '../types';
import StyleBase from '../styles/StyleBase';
import { required, validateEmail, validatePhoneNumber } from '../utils/validators';

const getTitle = (step: number) => {
  if (step === 1) {
    return 'To business details';
  }
  return step === 2 ? 'To business customisation' : 'Create business';
};

export default function MyBusinessScreen({ navigation }) {
  const [step, setCurrentStep] = useState(1);
  const [businessRegistrationFormValues, setBusinessRegistrationFormValues] =
    useState<BusinessRegistrationFormData>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onPressStepForm = (data) => {
    if (step < 3) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    console.log(data);
    navigation.push('MainScreen');
  };
  return (
    <View style={StyleBase.container}>
      <Text style={styles.stepCounter}>{`Step ${step}/3`}</Text>
      {step > 1 && (
        <Icon
          name='arrow-left'
          size={30}
          style={StyleBase.backArrow}
          onPress={() => setCurrentStep((prev) => prev - 1)}
          title='back'
        />
      )}
      {step === 1 && (
        <BoxContainer style={StyleBase.formMargin}>
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
            rules={{
              required,
            }}
            name='surname'
            placeholder='surname'
            isInvalid={Boolean(errors.surname)}
          />
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
              pattern: validatePhoneNumber,
            }}
            name='phoneNumber'
            placeholder='phone number'
            isInvalid={Boolean(errors.phoneNumber)}
          />
        </BoxContainer>
      )}
      {step === 2 && (
        <BoxContainer style={StyleBase.formMargin}>
          <HookFormInput
            control={control}
            rules={{
              required,
            }}
            name='NIP'
            placeholder='NIP'
            isInvalid={Boolean(errors.NIP)}
          />
          <HookFormInput
            control={control}
            rules={{
              required,
            }}
            name='KRS'
            placeholder='KRS'
            isInvalid={Boolean(errors.KRS)}
          />
          <HookFormInput
            control={control}
            rules={{
              required,
            }}
            name='REGON'
            placeholder='REGON'
            isInvalid={Boolean(errors.REGON)}
          />
          <HookFormInput
            control={control}
            rules={{
              required,
            }}
            name='businessName'
            placeholder='business name'
            isInvalid={Boolean(errors.businessName)}
          />
          <HookFormInput
            control={control}
            rules={{
              required,
            }}
            name='businessAddress'
            placeholder='business address'
            isInvalid={Boolean(errors.businessAddress)}
          />
          <HookFormInput
            control={control}
            rules={{
              required,
            }}
            name='postalCode'
            placeholder='postal code'
            isInvalid={Boolean(errors.postalCode)}
          />
          <HookFormInput
            control={control}
            rules={{
              required,
            }}
            name='city'
            placeholder='city'
            isInvalid={Boolean(errors.city)}
          />
        </BoxContainer>
      )}

      <CustomButton onPress={handleSubmit(onPressStepForm)} title={getTitle(step)} />
    </View>
  );
}

const styles = StyleSheet.create({
  stepCounter: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    right: 10,
  },
});

/*
{step === 3 && (
        <BoxContainer>
          <BoxContainer>
            <Text>Card icon</Text>
            <Text>Card icon dropzone placeholder</Text>
          </BoxContainer>
          <BoxContainer>
            <Text>Banner</Text>
            <Text>banner dropzone placeholder</Text>
          </BoxContainer>
          <BoxContainer>
            <Text>Menu</Text>
            <Text>menu dropzone placeholder</Text>
          </BoxContainer>
        </BoxContainer>
      )}
 */
