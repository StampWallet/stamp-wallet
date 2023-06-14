import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Pressable, SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { reducer, INITIAL_STATE, ACTIONS } from './util/reducer';

import useOnPressHandlers from '../../hooks/useOnPressHandlers';

import { getName, getBusinessDetails, getPoints, getInventory } from '../../utils/cardGetters';

import StyleBase from '../../styles/StyleBase';

import colors from '../../constants/colors';

import TopBar from '../../components/Bars/TopBar';
import TapBar from '../../components/Bars/TapBar';
import CardTile from '../../components/Cards/CardTile';
import Tile from '../../components/Miscellaneous/Tile';
import BenefitList from '../../components/Benefits/BenefitList';
import CustomButton from '../../components/Miscellaneous/CustomButton';
import BoxContainer from '../../components/Miscellaneous/BoxContainer';
import CustomModal from '../../components/Modals/CustomModal';
import { Card } from '../../types';

import * as api from '../../api';
import Auth from '../../database/Auth';

import { MAIN_ROUTE } from '../../constants/paths';
import Scanner from '../../components/Scanner';

//chaos

interface CardInfoScreenProps {
  navigation: any; //proper type
  route: any; //proper type
}

function ClaimBenefits(dispatch, inventory) {
  console.log('works, yahooo');
  dispatch({
    type: ACTIONS.SET_BENEFITS_TO_REALIZE,
    payload: inventory,
  });
  dispatch({ type: 'setScreen', payload: 'claimBenefits' });
}

export default function CardScreen({ navigation, route }: CardInfoScreenProps) {
  /*

  todo:
  add visible response for specific buttons (save, cancel, add benefit)
  code generation
  some alert if doing stuff with benefits to add pending
  realize benefits
  getImage
  */

  const selectedCard = route.params.Card as Card;
  const businessDetails = getBusinessDetails({ Card: selectedCard });
  const name = getName({ Card: selectedCard });
  let points = getPoints({ Card: selectedCard });
  let inventory = getInventory({ Card: selectedCard });

  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    // dumb hack with fallbacks, but works for now
    balance: points,
    balanceAfterTransaction: points,
    inventory: inventory,
    isSubmitting: false,
  });
  const { onPressBack } = useOnPressHandlers();

  const handleAddCard = async (cardData) => {
    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: !state.isSubmitting });
    let response = null;
    const header = Auth.getAuthHeader();
    //temp
    if ('businessDetails' in selectedCard) {
      const VCA = new api.VirtualCardsApi();

      try {
        response = await VCA.createVirtualCard(businessDetails.publicId, header);
      } catch (e) {
        response = e.response.code;
      }
    }

    //inaczej idee krzyczy
    if ('publicId' in selectedCard) {
      const LCA = new api.LocalCardsApi();

      try {
        response = await LCA.createLocalCard(
          { name: name, type: selectedCard.publicId, code: cardData.data },
          header
        );
      } catch (e) {
        response = e.response.code;
      }
    }

    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: !state.isSubmitting });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: MAIN_ROUTE }],
      })
    );
  };

  return 'businessDetails' in selectedCard ? (
    <SafeAreaView style={StyleBase.container}>
      <StatusBar barStyle='default' />
      {state.screenState === 'card' && (
        <>
          <TopBar
            iconLeft='arrow-left'
            onPressLeft={
              state.benefitsToAdd.length > 0
                ? () =>
                    dispatch({
                      type: ACTIONS.OPEN_MODAL,
                      payload: () => onPressBack(navigation),
                    })
                : /*dispatch({
                    type: ACTIONS.OPEN_MODAL,
                    payload: () => onPressBack(navigation),
                  })*/
                  () => onPressBack(navigation)
            }
          />
          {/* todo: image as Card.businessDetails.iconImageId */}
          <CardTile
            containerStyle={[styles.cardTile, !selectedCard.isAdded && { paddingBottom: 75 }]}
            imageUrl={businessDetails.bannerImageId}
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
                        onPress={
                          state.benefitsToAdd.length > 0
                            ? () =>
                                dispatch({
                                  type: ACTIONS.OPEN_MODAL,
                                  payload: () => ClaimBenefits(dispatch, inventory),
                                })
                            : () => ClaimBenefits(dispatch, inventory) /*{
                                dispatch({
                                  type: ACTIONS.SET_BENEFITS_TO_REALIZE,
                                  payload: inventory,
                                });
                                dispatch({ type: 'setScreen', payload: 'claimBenefits' });
                              }*/
                        }
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
                      onPress={() => dispatch({ type: ACTIONS.SET_SCREEN, payload: 'cart' })}
                      title='Cart'
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </>
      )}
      {state.screenState === 'benefit' && (
        <>
          <TopBar
            iconLeft='arrow-left'
            onPressLeft={() => {
              {
                dispatch({
                  type: ACTIONS.ON_BACK_BENEFITS,
                  payload: { screenState: 'card', cardInfoState: 'benefits' },
                });
              }
            }}
          />
          <BoxContainer style={styles.benefitDesc}>
            <Text style={styles.description}>{state.benefit.description}</Text>
          </BoxContainer>
          <CustomButton
            title='add benefit'
            onPress={() => {
              dispatch({ type: ACTIONS.TRANSACTION_ADD_BENEFIT, payload: state.benefit });
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
            {inventory?.length === 0 && <Text style={styles.headline}>No available benefits</Text>}
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
      {state.screenState === 'cart' && (
        <>
          <TopBar
            iconLeft='arrow-left'
            onPressLeft={() => {
              dispatch({ type: ACTIONS.TRANSACTION_CLEANUP });
              dispatch({ type: ACTIONS.SET_SCREEN, payload: 'card' });
            }}
          />
          <View style={{ height: '60%' }}>
            <BenefitList benefits={state.benefitsToAdd} mode='cart' dispatch={dispatch} />
          </View>
          <View style={[styles.buttonsContainer, { marginTop: '10%' }]}>
            <CustomButton
              onPress={() => {
                dispatch({ type: ACTIONS.TRANSACTION_CANCEL });
                dispatch({ type: ACTIONS.SET_SCREEN, payload: 'card' });
              }}
              title='Cancel'
              customButtonStyle={styles.button}
            />
            <CustomButton
              onPress={() => {
                dispatch({ type: ACTIONS.TRANSACTION_SAVE, payload: selectedCard });
                dispatch({ type: ACTIONS.SET_SCREEN, payload: 'card' });
              }}
              title='Purchase'
              customButtonStyle={styles.button}
            />
          </View>
        </>
      )}
      {!selectedCard.isAdded && (
        <CustomButton
          title='add card'
          onPress={() => handleAddCard(null)}
          disabled={state.isSubmitting}
        />
      )}
      <TapBar
        dispatch={state.benefitsToAdd.length > 0 ? dispatch : undefined}
        callbackFn={() =>
          //upo
          selectedCard.isAdded && dispatch({ type: ACTIONS.SET_SCREEN, payload: 'cart' })
        }
        tapBarState={'cardScreen'}
      />
      <CustomModal
        header='You have items pending in cart!'
        description='Do you wish to discard them and proceed?'
        isModalOpen={state.isModalOpen}
        confirmOption={<CustomButton onPress={() => state.onConfirmModal} title='Yes' />}
        cancelOption={
          <CustomButton onPress={() => dispatch({ type: ACTIONS.CLOSE_MODAL })} title='No' />
        }
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={StyleBase.container}>
      <TopBar iconLeft='arrow-left' onPressLeft={() => onPressBack(navigation)} />
      {!selectedCard.isAdded && (
        <Scanner onPressAdd={(cardData) => handleAddCard(cardData)} disabled={state.isSubmitting} />
      )}
      {selectedCard.isAdded && <Text>Scanner will be here</Text>}
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
    backgroundColor: colors.swViolet,
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
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    padding: 10,
  },
  description: {
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
    justifyContent: 'flex-start',
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
