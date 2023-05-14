import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import StyleBase from '../styles/StyleBase';

import useOnPressHandlers from '../hooks/useOnPressHandlers';

import colors from '../constants/colors';

import TopBar from '../components/TopBar';
import TapBar from '../components/TapBar';
import BoxContainer from '../components/BoxContainer';
import CustomButton from '../components/CustomButton';

export default function BenefitDescriptionScreen({ navigation, Benefit }) {
  const { onPressBack } = useOnPressHandlers();

  Benefit = {
    description:
      'Jeszcze gdy chodziłem do podstawówki, to był tam taki Paweł, i ja jechałem na rowerze, i go spotkałem, i potem jeszcze pojechałem do biedronki na lody, i po drodze do domu wtedy jeszcze, już do domu pojechałem.',
  };

  return (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft='arrow-left' onPressLeft={() => onPressBack(navigation)} />
      <BoxContainer style={styles.boxContainer}>
        <Text style={styles.description}>{Benefit.description}</Text>
      </BoxContainer>
      {/* temp solution, waiting for CustomButton style override */}
      <View style={styles.tempContainer}>
        <CustomButton title='add benefit' onPress={() => alert('Work in progress')} />
      </View>
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
  description: {
    //fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 24,
    margin: 20,
  },
  tempContainer: {
    marginTop: '3.375%',
    width: '100%',
    height: '6.875%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
