import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import StyleBase from '../styles/StyleBase';

import colors from '../constants/colors';

import useOnPressHandlers from '../hooks/useOnPressHandlers';

import TopBar from '../components/Bars/TopBar';
import TapBar from '../components/Bars/TapBar';
import BoxContainer from '../components/Miscellaneous/BoxContainer';
import CustomButton from '../components/Miscellaneous/CustomButton';

//todo: interface
export default function BenefitDescriptionScreen({ navigation, benefit }) {
  const { onPressBack } = useOnPressHandlers();

  benefit = {
    description:
      'Jeszcze gdy chodziłem do podstawówki, to był tam taki Paweł, i ja jechałem na rowerze, i go spotkałem, i potem jeszcze pojechałem do biedronki na lody, i po drodze do domu wtedy jeszcze, już do domu pojechałem.',
  };

  return (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft='arrow-left' onPressLeft={() => onPressBack(navigation)} />
      <BoxContainer style={styles.boxContainer}>
        <Text style={styles.description}>{benefit.description}</Text>
      </BoxContainer>
      <CustomButton
        title='add benefit'
        onPress={() => alert('Work in progress')}
        customButtonStyle={styles.button}
      />
      <TapBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: colors.swViolet,
    borderRadius: 10,
    width: '88.33%',
    height: '68.75%',
    justifyContent: 'flex-start', //?
    //shadows to be applied
  },
  button: {
    marginTop: '3.375%',
    width: '85%',
    height: '8%',
    justifyContent: 'center',
  },
  description: {
    //fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 24,
    margin: 20,
  },
});
