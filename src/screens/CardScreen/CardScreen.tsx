import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, StatusBar, Pressable, SafeAreaView } from 'react-native';

import { reducer, INITIAL_STATE, ACTIONS } from './util/reducer';

import useOnPressHandlers from '../../hooks/useOnPressHandlers';

import {
  getName,
  getImage,
  getBusinessDetails,
  getPoints,
  getInventory,
} from '../../utils/cardGetters';

import StyleBase from '../../styles/StyleBase';

import colors from '../../constants/colors';

import TopBar from '../../components/Bars/TopBar';
import TapBar from '../../components/Bars/TapBar';
import CardTile from '../../components/Cards/CardTile';
import Tile from '../../components/Miscellaneous/Tile';
import BenefitList from '../../components/Benefits/BenefitList';
import CustomButton from '../../components/Miscellaneous/CustomButton';
import BoxContainer from '../../components/Miscellaneous/BoxContainer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
//import { VirtualCard, LocalCard, Card } from '../../types';
import { RouteProp } from '@react-navigation/native';

//chaos

interface CardInfoScreenProps {
  navigation: any; //proper type
  route: any; //proper type
}

export default function CardScreen({ navigation, route }: CardInfoScreenProps) {
  /*

  todo:
  add visible response for specific buttons (save, cancel, add benefit)
  code generation
  some alert if doing stuff with benefits to add pending
  
  use getVirtualCard
  */

  //const { Card: selectedCard } = route.params as Card;
  const selectedCard = route.params.Card;
  const businessDetails = getBusinessDetails({ Card: selectedCard });
  let points = getPoints({ Card: selectedCard });
  let inventory = getInventory({ Card: selectedCard });
  //console.log({ selectedCard });
  //let inventory = []; //temp - fetch

  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    balance: points,
    balanceAfterTransaction: points,
    inventory: inventory,
  });
  const { onPressBack } = useOnPressHandlers();

  return 'businessDetails' in selectedCard ? (
    <SafeAreaView style={StyleBase.container}>
      <StatusBar barStyle='default' />
      {state.screenState === 'card' && (
        <>
          <TopBar iconLeft={'arrow-left'} onPressLeft={() => onPressBack(navigation)} />
          {/* todo: image as Card.businessDetails.iconImageId */}
          <CardTile
            containerStyle={[styles.cardTile, !selectedCard.isAdded && { paddingBottom: 75 }]}
            //image={getImage(selectedCard)}
            tileStyle={{ width: '88.66%' }}
          />
          {selectedCard.isAdded && (
            <Tile style={styles.cardInfo}>
              <View style={styles.accountTileContainer}>
                <Text style={styles.text}>Account balance</Text>
                <View style={{ width: '35%', alignItems: 'flex-end' }}>
                  <Text style={styles.text}>{state.balanceAfterTransaction}</Text>
                </View>
              </View>
            </Tile>
          )}
          <View style={styles.buttonsContainer}>
            <Pressable onPress={() => dispatch({ type: 'setCardInfo', payload: 'business' })}>
              <Tile
                style={[
                  styles.button,
                  state.cardInfoState === 'benefits' && { backgroundColor: colors.swPaleViolet },
                ]}
              >
                <Text style={styles.text}>Business</Text>
              </Tile>
            </Pressable>
            <Pressable
              onPress={() => {
                dispatch({ type: 'setCardInfo', payload: 'benefits' });
              }}
            >
              <Tile
                style={[
                  styles.button,
                  state.cardInfoState === 'business' && { backgroundColor: colors.swPaleViolet },
                ]}
              >
                <Text style={styles.text}>Benefits</Text>
              </Tile>
            </Pressable>
          </View>
          <View style={[styles.container, !selectedCard.isAdded && { height: '50%' }]}>
            {state.cardInfoState === 'business' && (
              <>
                <BoxContainer style={styles.boxContainer}>
                  <Text style={[styles.text, { paddingBottom: 40 }]}>
                    {getName({ Card: selectedCard })}
                  </Text>
                  <Text style={[styles.text, { paddingBottom: 40 }]}>Address</Text>
                  <Text style={styles.text}>{businessDetails.description}</Text>
                </BoxContainer>
                {selectedCard.isAdded && (
                  <>
                    <View style={styles.claimButton}>
                      <CustomButton
                        onPress={() => {
                          dispatch({
                            type: ACTIONS.SET_BENEFITS_TO_REALIZE,
                            payload: inventory,
                          });
                          dispatch({ type: 'setScreen', payload: 'claimBenefits' });
                        }}
                        title='Claim Benefits'
                      />
                    </View>
                    <View style={styles.showCard}>
                      <CustomButton onPress={() => alert('Work in progress')} title='Show Card' />
                    </View>
                  </>
                )}
              </>
            )}
            {state.cardInfoState === 'benefits' && (
              <>
                <View style={styles.benefitsContainer}>
                  <Text style={styles.text}>List of benefits</Text>
                  {selectedCard.isAdded && (
                    <BenefitList
                      benefits={selectedCard.businessDetails.itemDefinitions}
                      dispatch={dispatch}
                      customBenefitTileStyle={{ width: '100%', height: 60 }}
                      mode='addToInventory'
                    />
                  )}
                  {!selectedCard.isAdded && (
                    <BenefitList
                      benefits={selectedCard.businessDetails.itemDefinitions}
                      customBenefitTileStyle={{ width: '100%', height: 60 }}
                      mode='preview'
                    />
                  )}
                </View>
                {selectedCard.isAdded && (
                  <View style={[styles.buttonsContainer, { marginTop: '10%' }]}>
                    <CustomButton
                      onPress={() => dispatch({ type: ACTIONS.TRANSACTION_CANCEL })}
                      title='Cancel'
                      customButtonStyle={styles.button}
                    />
                    <CustomButton
                      onPress={() => {
                        dispatch({ type: ACTIONS.TRANSACTION_SAVE, payload: selectedCard });
                      }}
                      title='Save'
                      customButtonStyle={styles.button}
                    />
                  </View>
                )}
              </>
            )}
          </View>
          {!selectedCard.isAdded && (
            <CustomButton title='add card' onPress={() => alert('Work in progress')} />
          )}
          <TapBar callbackFn={() => {}} />
        </>
      )}
      {state.screenState === 'benefit' && (
        <>
          <TopBar
            iconLeft='arrow-left'
            onPressLeft={() => {
              dispatch({
                type: ACTIONS.ON_BACK_BENEFITS,
                payload: { screenState: 'card', cardInfoState: 'benefits' },
              });
            }}
          />
          <BoxContainer style={styles.benefitDesc}>
            <Text style={styles.description}>{state.benefit.description}</Text>
          </BoxContainer>
          <CustomButton
            title='add benefit'
            onPress={() => {
              dispatch({ type: ACTIONS.TRANSACTION_ADD_BENEFIT });
            }}
            customButtonStyle={styles.benefitButton}
          />
        </>
      )}
      {state.screenState === 'claimBenefits' && (
        <>
          <TopBar
            iconLeft='arrow-left'
            onPressLeft={() => {
              dispatch({
                type: ACTIONS.ON_BACK_BENEFITS,
                payload: { screenState: 'card', cardInfoState: 'business' },
              });
            }}
          />
          <View style={{ alignItems: 'center', height: '75%' }}>
            {inventory.length !== 0 && <Text style={styles.headline}>Available Benefits</Text>}
            {inventory.length === 0 && <Text style={styles.headline}>No available benefits</Text>}
            <BenefitList
              benefits={state.benefitsToRealize}
              mode='addToRealization'
              dispatch={dispatch}
            />
          </View>
          <CustomButton
            onPress={() => {
              dispatch({ type: ACTIONS.REALIZE_BENEFITS });
              alert('dummy text');
              //todo
            }}
            title='generate code'
            customButtonStyle={[styles.button, { width: '80%' }]}
          />
        </>
      )}
      <TapBar callbackFn={() => {}} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={StyleBase.container}>
      <TopBar iconLeft={'arrow-left'} onPressLeft={() => onPressBack(navigation)} />
      <Text>This is real card info</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  accountTileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitsContainer: {
    width: '90%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '2.5%',
    borderWidth: 1,
  },
  boxContainer: {
    height: '53.75%',
    width: '89.72%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.swViolet,
    borderRadius: 10,
    marginTop: '1.5%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 175,
    height: 60,
  },
  buttonsContainer: {
    height: '7.875%',
    //width
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.75%',
    gap: 10,
  },
  cardInfo: {
    width: '88.66%',
    height: '8%',
    marginTop: '0.075%',
  },
  cardTile: {
    marginBottom: '2%',
    width: '100%',
    alignItems: 'center',
  },
  claimButton: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center',
  },
  container: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
  },
  showCard: {
    //marginTop: '2.375%',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    padding: 10,
  },
  description: {
    //fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 24,
    margin: 20,
  },
  benefitDesc: {
    backgroundColor: colors.swViolet,
    borderRadius: 10,
    width: '88.33%',
    height: '68.75%',
    justifyContent: 'flex-start', //?
    //shadows to be applied
  },
  benefitButton: {
    marginTop: '3.375%',
    width: '85%',
    height: '8%',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 25,
    paddingBottom: 30,
    textDecorationLine: 'underline',
  },
});
