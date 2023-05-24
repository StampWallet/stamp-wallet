import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Pressable } from 'react-native';

import useOnPressHandlers from '../hooks/useOnPressHandlers';

import StyleBase from '../styles/StyleBase';

import colors from '../constants/colors';

import { Benefit } from '../types';

import TopBar from '../components/Bars/TopBar';
import TapBar from '../components/Bars/TapBar';
import CardTile from '../components/Cards/CardTile';
import Tile from '../components/Miscellaneous/Tile';
import BenefitList from '../components/Benefits/BenefitList';
import CustomButton from '../components/Miscellaneous/CustomButton';
import BoxContainer from '../components/Miscellaneous/BoxContainer';

const SHOW_VIRTUAL = 1;

//chaos

let benefitsToAdd = [];

interface CardInfoScreenProps {
  navigation: any; //proper type
  route: any; //proper type
}

export default function CardScreen({ navigation, route }: CardInfoScreenProps) {
  /*

  todo:
  needs some styling
  tested on pixel 6 pro (1440x3120), components MAY NOT fit properly on other models

  proper account balance from api
  proper descriptions
  proper everything (after api implementation)
  */

  const { Card } = route.params;

  type CardInfoScreenState = 'benefits' | 'business';
  type ScreenState = 'card' | 'benefit' | 'claimBenefits';

  const [cardInfoState, setInfo] = useState<CardInfoScreenState>('business');
  const [screenState, setScreen] = useState<ScreenState>('card');
  const [benefit, setBenefit] = useState<Benefit>();
  const [accountBalance, setBalance] = useState(Card.content.points);

  const { onPressBack } = useOnPressHandlers();

  const AddBenefit = (benefit) => {
    if (accountBalance < benefit.price) {
      alert('Insufficient points'); //temp
      return;
    }
    let item = benefitsToAdd.find((x) => x.id === benefit.publicId);
    item ? item.amount++ : benefitsToAdd.push({ id: benefit.publicId, amount: 1 });
    setBalance(accountBalance - benefit.price);
    console.log(benefitsToAdd);
  };

  const OnSave = () => {
    benefitsToAdd.forEach((benefit) => {
      let obj = Card.content.inventory.find((x) => x.id === benefit.id);
      obj ? (obj.amount += benefit.amount) : Card.content.inventory.push(benefit);
    });
    Card.content.points = accountBalance;
    benefitsToAdd = [];
    //console.log(Card.content.inventory);
  };

  const OnCancel = () => {
    benefitsToAdd = [];
    setBalance(Card.content.points);
  };

  return Card.type === 'virtual' ? (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      {screenState === 'card' && (
        <>
          <TopBar iconLeft={'arrow-left'} onPressLeft={() => onPressBack(navigation)} />
          {/* todo: image as Card.businessDetails.iconImageId */}
          <CardTile
            containerStyle={[styles.cardTile, !Card.isAdded && { paddingBottom: 75 }]}
            image={Card.content.businessDetails.bannerImageId}
            tileStyle={{ width: '88.66%' }}
          />
          {Card.isAdded && (
            <Tile style={styles.cardInfo}>
              <View style={styles.accountTileContainer}>
                <Text style={styles.text}>Account balance</Text>
                <View style={{ width: '35%', alignItems: 'flex-end' }}>
                  <Text style={styles.text}>{accountBalance}</Text>
                </View>
              </View>
            </Tile>
          )}
          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={() => {
                setInfo('business');
              }}
            >
              <Tile
                style={[
                  styles.button,
                  cardInfoState === 'benefits' && { backgroundColor: colors.swPaleViolet },
                ]}
              >
                <Text style={styles.text}>Business</Text>
              </Tile>
            </Pressable>
            <Pressable
              onPress={() => {
                setInfo('benefits');
              }}
            >
              <Tile
                style={[
                  styles.button,
                  cardInfoState === 'business' && { backgroundColor: colors.swPaleViolet },
                ]}
              >
                <Text style={styles.text}>Benefits</Text>
              </Tile>
            </Pressable>
          </View>
          <View style={[styles.container, !Card.isAdded && { height: '50%' }]}>
            {cardInfoState === 'business' && (
              <>
                <BoxContainer style={styles.boxContainer}>
                  <Text style={[styles.text, { paddingBottom: 40 }]}>
                    {Card.content.businessDetails.name}
                  </Text>
                  <Text style={[styles.text, { paddingBottom: 40 }]}>Address</Text>
                  <Text style={styles.text}>{Card.content.businessDetails.description}</Text>
                </BoxContainer>
                {Card.isAdded && (
                  <>
                    <View style={styles.claimButton}>
                      <CustomButton
                        onPress={() => setScreen('claimBenefits')}
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
            {cardInfoState === 'benefits' && (
              <>
                <View style={styles.benefitsContainer}>
                  <Text style={styles.text}>List of benefits</Text>
                  {Card.isAdded && (
                    <BenefitList
                      benefits={Card.content.benefits}
                      setBenefit={setBenefit}
                      setState={setScreen}
                      customBenefitTileStyle={{ width: '100%', height: 60 }}
                      mode='addToInventory'
                    />
                  )}
                  {!Card.isAdded && (
                    <BenefitList
                      benefits={Card.content.benefits}
                      onPress={() => {}}
                      customBenefitTileStyle={{ width: '100%', height: 60 }}
                      mode='addToInventory'
                    />
                  )}
                </View>
                {Card.isAdded && (
                  <View style={[styles.buttonsContainer, { marginTop: '10%' }]}>
                    <CustomButton
                      onPress={() => OnCancel()}
                      title='Cancel'
                      customButtonStyle={styles.button}
                    />
                    <CustomButton
                      onPress={() => OnSave()}
                      title='Save'
                      customButtonStyle={styles.button}
                    />
                  </View>
                )}
              </>
            )}
          </View>
          {!Card.isAdded && (
            <CustomButton title='add card' onPress={() => alert('Work in progress')} />
          )}
          <TapBar navigation={navigation} />
        </>
      )}
      {screenState === 'benefit' && (
        <>
          <TopBar
            iconLeft='arrow-left'
            onPressLeft={() => {
              setInfo('benefits');
              setScreen('card');
            }}
          />
          <BoxContainer style={styles.benefitDesc}>
            <Text style={styles.description}>{benefit.description}</Text>
          </BoxContainer>
          <CustomButton
            title='add benefit'
            onPress={() => AddBenefit(benefit)}
            customButtonStyle={styles.benefitButton}
          />
        </>
      )}
      {screenState === 'claimBenefits' && (
        <>
          <TopBar
            iconLeft='arrow-left'
            onPressLeft={() => {
              setInfo('benefits');
              setScreen('card');
            }}
          />
          {/* todo
          <BenefitList
            benefits={Card.content.inventory}
            mode='addToInventory'
            customListStyle={{ paddingTop: 100 }}
          />
          */}
        </>
      )}
      <TapBar navigation={navigation} />
    </View>
  ) : (
    <View style={StyleBase.container}>
      <TopBar iconLeft={'arrow-left'} onPressLeft={() => onPressBack(navigation)} />
      <Text>This is real card info</Text>
    </View>
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
});
