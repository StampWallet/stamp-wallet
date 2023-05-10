import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TopBar from '../components/TopBar';
import InputField from '../components/InputField';
import FileDropZone from '../components/FileDropZone';
import DatePicker from '../components/DatePicker';
import CustomButton from '../components/CustomButton';
import TapBar from '../components/TapBar';
import BoxContainer from '../components/BoxContainer';

/*
todo: 
      fix inputfields to not fuck up the screen when inputing
      integrate/implement datepicker
      check if existing or new benefit
      implementation for new below
      for existing same but info given eg. useState(card prop)
      ^de facto change only button onPress?
      button onPress sends request through api
*/

export default function BenefitManipulationScreen({ navigation, Benefit }) {
  //todo: use hookforms instead of usestate
  const [name, setName] = useState(/* Benefit.name */ '');
  const [price, setPrice] = useState(/* Benefit.price */ '');
  const [description, setDescription] = useState(/* Benefit.description */ '');
  const [maxAmount, setmaxAmount] = useState(/* Benefit.maxAmount*/ '');
  const title = Benefit /*.publicId*/ ? 'Edit benefit' : 'Create benefit';
  const onPress = Benefit /*.publicId*/
    ? () => alert('Work on edition in progress')
    : () => alert('Work on creation in progress');

  return (
    <View style={styles.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft={'arrow-left'} onPressLeft={() => navigation.pop()} />
      <BoxContainer style={styles.boxContainer}>
        <InputField placeholder='name' value={name} setValue={setName} />
        <InputField placeholder='number of points required' value={price} setValue={setPrice} />
        <InputField placeholder='short description' value={description} setValue={setDescription} />
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
        <InputField
          placeholder='maximum number of benefits in inventory'
          value={maxAmount}
          setValue={setmaxAmount}
        />
        <CustomButton title={title} onPress={onPress} />
      </BoxContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '85%',
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
