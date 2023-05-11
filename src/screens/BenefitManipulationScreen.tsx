import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';

import StyleBase from '../styles/StyleBase';

import TopBar from '../components/TopBar';
import FileDropZone from '../components/FileDropZone';
import DatePicker from '../components/DatePicker';
import CustomButton from '../components/CustomButton';
import BoxContainer from '../components/BoxContainer';
import HookFormInput from '../components/HookFormInput';

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
  const name = /*Benefit.name*/ '';
  const description = /*Benefit.description*/ '';
  const maxAmount = /*Benefit.maxAmount*/ '';

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const noPoints = watch('noPoints');
  const noBenefits = watch('noBenefits');

  const title = Benefit /*.publicId*/ ? 'Edit benefit' : 'Create benefit';
  const onPress = Benefit /*.publicId*/
    ? handleSubmit(() => alert('Work on edition in progress'))
    : handleSubmit(() => alert('Work on creation in progress'));
  return (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft={'arrow-left'} onPressLeft={() => navigation.pop()} />
      <ScrollView style={styles.scrollView}>
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
            rules={{ required, validate: () => validateNumber(noPoints) }}
            placeholder='number of points required'
            name='noPoints'
            isInvalid={Boolean(errors.noPoints)}
          />
          <HookFormInput
            control={control}
            rules={{ required }}
            placeholder='short description'
            name='desc'
            isInvalid={Boolean(errors.desc)}
          />
          {/* todo: style text */}
          <Text style={styles.text}>Benefit icon</Text>
          {/* implementation waiting room, Benefit.imageId for current shown*/}
          <FileDropZone />
          <View style={styles.containerDatepicker}>
            {/* waiting room
          <DatePicker />
          <DatePicker />
          Benefit.startDate, Benefit.endDate
          */}
            <Text>first datepicker</Text>
            <Text>second datepicker</Text>
          </View>
          <HookFormInput
            control={control}
            rules={{ required, validate: () => validateNumber(noBenefits) }}
            placeholder='maximum number of benefits in inventory'
            name='noBenefits'
            isInvalid={Boolean(errors.noBenefits)}
          />
          <CustomButton title={title} onPress={onPress} />
        </BoxContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    //backgroundColor: '#000',
    height: 700,
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
    paddingTop: 50,
    paddingBottom: 50,
    height: 600,
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
