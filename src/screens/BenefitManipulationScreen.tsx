import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';

import StyleBase from '../styles/StyleBase';

import TopBar from '../components/Bars/TopBar';
import HookFormImagePicker from '../components/HookFormComponents/HookFormImagePicker';
import HookFormDatePicker from '../components/HookFormComponents/HookFormDatePicker';
import CustomButton from '../components/Miscellaneous/CustomButton';
import BoxContainer from '../components/Miscellaneous/BoxContainer';
import HookFormInput from '../components/HookFormComponents/HookFormInput';

import { required, validateNumber } from '../utils/validators';

/*
todo: 
      integrate/implement datepicker
      check if existing or new benefit
      button onPress sends request through api
      fix scroll view
      check if noBenefits integer
      check maxAmount
      provide initial value to forminput
*/

export default function BenefitManipulationScreen({ navigation, Benefit }) {
  const name = /*Benefits.name*/ '';
  const description = /*Benefits.description*/ '';
  const maxAmount = /*Benefits.maxAmount*/ '';

  const { ...methods } = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = methods;

  const pointsWatch = watch('noPoints');
  const benefitsWatch = watch('noBenefits');

  const title = Benefit /*.publicId*/ ? 'Edit benefit' : 'Create benefit';
  const onPress = Benefit /*.publicId*/
    ? handleSubmit(() => alert('Work on edition in progress'))
    : handleSubmit(() => alert('Work on creation in progress'));

  return (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft='arrow-left' onPressLeft={() => navigation.pop()} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}
      >
        <FormProvider {...methods}>
          {/* show current value? */}
          <HookFormInput
            control={control}
            rules={{ required }}
            placeholder='name'
            name='name'
            isInvalid={Boolean(errors.name)}
          />
          <HookFormInput
            control={control}
            rules={{ required, validate: () => validateNumber(pointsWatch) }}
            placeholder='number of points required'
            name='points'
            isInvalid={Boolean(errors.points)}
          />
          <HookFormInput
            control={control}
            rules={{ required }}
            placeholder='short description'
            name='desc'
            isInvalid={Boolean(errors.desc)}
          />
          {/* todo: style text */}
          <HookFormImagePicker
            control={control}
            rules={{ required }}
            name='benefitIcon'
            isInvalid={Boolean(errors.benefitIcon)}
          />
          <View style={styles.containerDatepicker}>
            <HookFormDatePicker
              control={control}
              rules={{}}
              name='dateFrom'
              isInvalid={false}
              placeholder='date from'
            />
            <HookFormDatePicker
              control={control}
              rules={{}}
              name='dateTo'
              isInvalid={false}
              placeholder='date to'
            />
          </View>
          <HookFormInput
            control={control}
            rules={{ required, validate: () => validateNumber(benefitsWatch) }}
            placeholder='maximum number of benefits in inventory'
            name='benefits'
            isInvalid={Boolean(errors.benefits)}
          />
        </FormProvider>
        <CustomButton title={title} onPress={onPress} customButtonStyle={{ width: '100%' }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    //backgroundColor: '#000',
    marginTop: '15%',
    height: '80%',
    width: 350,
  },
  containerDatepicker: {
    height: 100,
    width: '90%',
    gap: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  boxContainer: {
    height: '80%',
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Platform.select({ ios: 'Arial', android: 'Roboto' }),
    fontSize: 24,
    fontWeight: '200',
    textDecorationLine: 'underline',
  },
});
