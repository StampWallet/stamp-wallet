import React, { useReducer } from 'react';
import { StyleSheet, Text, View, StatusBar, Pressable, SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { reducer, INITIAL_STATE, ACTIONS, ProcessInventory } from './util/reducer';

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
import { Snackbar } from 'react-native-paper';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import BarcodeTile from '../../components/BarcodeTile';
import { fetchVirtualCard } from '../../utils/fetchCards';
import { postTransaction, startTransaction } from '../../utils/transactions';
import { benefits } from '../../assets/mockData/BenefitsApi';
import { itemDefinitions } from '../../assets/mockData/itemDefinition';

//chaos

interface CardInfoScreenProps {
  navigation: any; //proper type
  route: any; //proper type
}

function ClaimBenefits(dispatch, inventory) {
  //console.log(inventory);
  dispatch({
    type: ACTIONS.SET_BENEFITS_TO_REALIZE,
    payload: inventory,
  });
  dispatch({ type: 'setScreen', payload: 'claimBenefits' });
}

const StartTransaction = async (dispatch, selectedCard) => {
  await dispatch({
    type: ACTIONS.REALIZE_BENEFITS,
    payload: [selectedCard.businessDetails.publicId, dispatch],
  });
};

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
  //console.log(selectedCard);
  const businessDetails = getBusinessDetails({ Card: selectedCard });
  const name = getName({ Card: selectedCard });
  let points = getPoints({ Card: selectedCard });
  //let inventory = getInventory({ Card: selectedCard });
  let [inventory, inventoryProper] = ProcessInventory(benefits);
  //let [inventory, inventoryProper] = ProcessInventory(getInventory({ Card: selectedCard }));

  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    // dumb hack with fallbacks, but works for now
    balance: points,
    balanceAfterTransaction: points,
    //inventory: inventory,
    inventory: inventoryProper,
    inventoryIds: inventory,
    benefitsToRealize: inventoryProper,
    isSubmitting: false,
  });
  console.log(state.barcode);
  const { onPressBack } = useOnPressHandlers();

  const handleAddCard = async (cardData) => {
    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: !state.isSubmitting });
    console.log('handle add card');
    let requestStatus = null;
    const header = Auth.getAuthHeader();
    //temp
    if ('businessDetails' in selectedCard) {
      const VCA = new api.VirtualCardsApi();

      try {
        console.log('test');
        const response = await VCA.createVirtualCard(businessDetails.publicId, header);
        requestStatus = {
          color: colors.swDarkGreen,
          message: 'Card has been successfully added to your account.',
          visible: true,
        };
      } catch (e) {
        const { status } = e.response.data;
        if (status !== 'ALREADY_EXISTS') {
          requestStatus = {
            color: colors.swRed,
            message: 'Something went wrong, try again later.',
            visible: true,
          };
        } else {
          requestStatus = {
            color: colors.swRed,
            message: 'You already have this card.',
            visible: true,
          };
        }
      }
    }

    //inaczej idee krzyczy
    if ('publicId' in selectedCard) {
      const LCA = new api.LocalCardsApi();

      try {
        const response = await LCA.createLocalCard(
          { name, type: selectedCard.publicId, code: cardData.data },
          header
        );
        requestStatus = {
          color: colors.swDarkGreen,
          message: 'Card has been successfully added to your account.',
          visible: true,
        };
      } catch (e) {
        const response = e.response.code;
        requestStatus = {
          color: colors.swRed,
          message: 'Something went wrong, try again later.',
          visible: true,
        };
      }
    }

    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: !state.isSubmitting });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: MAIN_ROUTE, params: requestStatus }],
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
                : () => onPressBack(navigation)
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
                                  payload: () => {
                                    dispatch({ type: ACTIONS.TRANSACTION_CANCEL });
                                    dispatch({ type: ACTIONS.CLOSE_MODAL });
                                    ClaimBenefits(dispatch, state.inventory);
                                  },
                                })
                            : () => {
                                //console.log(state.benefitsToRealize);
                                ClaimBenefits(dispatch, state.inventory);
                              }
                        }
                        title='Claim Benefits'
                      />
                    </View>
                    <View style={styles.showCard}>
                      <CustomButton
                        onPress={() =>
                          //postTransaction('000680637592', { addedPoints: 1000, itemActions: [] })
                          {
                            StartTransaction(dispatch, selectedCard);
                            /*
                            dispatch({
                              type: ACTIONS.REALIZE_BENEFITS,
                              payload: selectedCard.businessDetails.publicId,
                            });
                            */
                            //dispatch({ type: ACTIONS.SET_SCREEN, payload: 'barcode' });
                          }
                        }
                        title='Show Card'
                      />
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
              StartTransaction(dispatch, selectedCard);
              /*
              dispatch({
                type: ACTIONS.REALIZE_BENEFITS,
                payload: selectedCard.businessDetails.publicId,
              });
              */
              //dispatch({ type: ACTIONS.SET_SCREEN, payload: 'barcode' });
              //todo
            }}
            title='Show Card'
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
      {state.screenState === 'barcode' && <BarcodeTile value={state.barcode} format='EAN13' />}
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
        confirmOption={<CustomButton onPress={state.onConfirmModal} title='Yes' />}
        cancelOption={
          <CustomButton onPress={() => dispatch({ type: ACTIONS.CLOSE_MODAL })} title='No' />
        }
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={StyleBase.container}>
      <TopBar iconLeft='arrow-left' onPressLeft={() => onPressBack(navigation)} />
      <CardTile
        containerStyle={styles.cardTile}
        imageUrl={selectedCard.imageUrl}
        tileStyle={{ width: '88.66%' }}
      />
      {selectedCard.isAdded && (
        <BarcodeTile value={selectedCard.code} format={selectedCard.barcodeType} />
      )}
      {!selectedCard.isAdded && (
        <Scanner onPressAdd={(cardData) => handleAddCard(cardData)} disabled={state.isSubmitting} />
      )}
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
