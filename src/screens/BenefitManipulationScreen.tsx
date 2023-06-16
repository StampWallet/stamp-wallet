import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, View, Platform, ScrollView, SafeAreaView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';

import StyleBase from '../styles/StyleBase';

import TopBar from '../components/Bars/TopBar';
import HookFormImagePicker from '../components/HookFormComponents/HookFormImagePicker';
import HookFormDatePicker from '../components/HookFormComponents/HookFormDatePicker';
import CustomButton from '../components/Miscellaneous/CustomButton';
import BoxContainer from '../components/Miscellaneous/BoxContainer';
import HookFormInput from '../components/HookFormComponents/HookFormInput';

import { required, validateNumber } from '../utils/validators';
import { MAX_DATE, MIN_DATE } from '../constants/numericAndStringConstants';

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

export default function BenefitManipulationScreen({ navigation, route }) {
  const name = /*Benefits.name*/ '';
  const description = /*Benefits.description*/ '';
  const maxAmount = /*Benefits.maxAmount*/ '';

  const data = route?.params?.params;

  console.log(data);

  const { ...methods } = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const pointsWatch = watch('noPoints');
  const benefitsWatch = watch('noBenefits');
  const dateFromWatch = watch('dateFrom');
  const dateToWatch = watch('dateToWatch');

  const title = data /*.publicId*/ ? 'Edit benefit' : 'Create benefit';
  const onPress = data /*.publicId*/
    ? handleSubmit(() => alert('Work on edition in progress'))
    : handleSubmit(() => alert('Work on creation in progress'));

  useEffect(() => {
    if (!data) {
      return;
    }

    setValue('name', data.name);
    setValue('price', data.price);
    setValue('desc', data.description);
    setValue('dateFrom', data.startDate);
    // setValue('benefits', data.maxAmount);
  }, [data, setValue]);

  return (
    <SafeAreaView style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft='arrow-left' onPressLeft={() => navigation.pop()} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}
      >
        <FormProvider {...methods}>
          <BoxContainer style={styles.boxContainer}>
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
            <HookFormImagePicker
              control={control}
              rules={{ required }}
              name='benefitIcon'
              isInvalid={Boolean(errors.benefitIcon)}
            />
            <View style={styles.containerDatepicker}>
              <View style={styles.datePicker}>
                <HookFormDatePicker
                  control={control}
                  name='dateFrom'
                  rules={{ required }}
                  minDate={MIN_DATE}
                  maxDate={dateToWatch || MAX_DATE}
                  isInvalid={Boolean(errors.dateFrom)}
                />
              </View>
              <View style={styles.datePicker}>
                <HookFormDatePicker
                  control={control}
                  name='dateTo'
                  rules={{ required }}
                  minDate={dateFromWatch || MIN_DATE}
                  maxDate={MAX_DATE}
                  isInvalid={Boolean(errors.dateTo)}
                />
              </View>
            </View>
            <HookFormInput
              control={control}
              rules={{ required, validate: () => validateNumber(benefitsWatch) }}
              placeholder='maximum number of benefits in inventory'
              name='benefits'
              isInvalid={Boolean(errors.benefits)}
            />
            <CustomButton title={title} onPress={onPress} customButtonStyle={{ width: '100%' }} />
          </BoxContainer>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    //backgroundColor: '#000',
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
  datePicker: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
