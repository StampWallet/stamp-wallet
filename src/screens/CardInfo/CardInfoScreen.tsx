import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Pressable } from 'react-native';

import useOnPressHandlers from '../../hooks/useOnPressHandlers';

import StyleBase from '../../styles/StyleBase';

import colors from '../../constants/colors';

import { Benefit } from '../../types';

import TopBar from '../../components/Bars/TopBar';
import TapBar from '../../components/Bars/TapBar';
import CardTile from '../../components/Cards/CardTile';
import Tile from '../../components/Miscellaneous/Tile';
import BenefitList from '../../components/Benefits/BenefitList';
import CustomButton from '../../components/Miscellaneous/CustomButton';
import BoxContainer from '../../components/Miscellaneous/BoxContainer';

const SHOW_VIRTUAL = 1;

//temp
interface ICardInfoScreen {
  navigation: any; //proper type
  Card?: any; //todo
  benefits: Benefit[];
}

export default function CardInfo({ navigation, Card, benefits }: ICardInfoScreen) {
  /*
  todo:b
  check if virtual or real
  needs some styling
  tested on pixel 6 pro (1440x3120), components MAY NOT fit properly on other models
  proper card icon
  proper account balance from api
  proper descriptions
  proper everything (after api implementation)
  */

  const [screenState, setState] = useState(1);

  const { onPressBack } = useOnPressHandlers();

  return SHOW_VIRTUAL ? (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft={'arrow-left'} onPressLeft={() => onPressBack(navigation)} />
      {/* todo: apply paddings
                image as Card.businessDetails.iconImageId */}
      {/*temp solution - Tile of CardTile style override */}
      <View style={styles.cardTile}>
        <CardTile
          image={require('../../assets/images/biedronka_homepage.jpg')}
          onPress={() => {}}
        />
      </View>
      <Tile style={styles.cardInfo}>
        <View style={styles.accountTileContainer}>
          <Text style={styles.text}>Account balance</Text>
          <Text style={styles.text}>100</Text>
        </View>
      </Tile>
      <View style={styles.buttonsContainer}>
        {/* todo: custom button styles to fit screen
                          or make them cardtiles instead but without image?
                          implement onPress   */}
        <Pressable
          onPress={() => {
            setState(1);
          }}
        >
          <Tile style={styles.button}>
            <Text style={styles.text}>Business</Text>
          </Tile>
        </Pressable>
        <Pressable
          onPress={() => {
            setState(0);
          }}
        >
          <Tile style={styles.button}>
            <Text style={styles.text}>Benefits</Text>
          </Tile>
        </Pressable>
        {/*
        <CustomButton onPress={() => alert('Work in progress')} title='Business' type='primary' />
                        <CustomButton onPress={() => alert('Work in progress')} title='Benefits' /> */}
      </View>
      {/* everything below is in temp form, what is rendered will be based on button^ pressed */}
      {screenState ? (
        <View style={styles.container}>
          <BoxContainer style={styles.boxContainer}>
            <Text style={[styles.text, { paddingBottom: 40 }]}>Business name</Text>
            <Text style={[styles.text, { paddingBottom: 40 }]}>Address</Text>
            <Text style={styles.text}>Info</Text>
          </BoxContainer>
          {/* todo: apply proper paddings
                even more temp solutions below */}
          <View style={styles.claimButton}>
            <CustomButton onPress={() => alert('Work in progress')} title='Claim Benefits' />
          </View>
          <View style={styles.showCard}>
            <CustomButton onPress={() => alert('Work in progress')} title='Show Card' />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.benefitsContainer}>
            <Text style={styles.text}>List of benefits</Text>
            {/*todo: style the tiles in list */}
            <BenefitList
              benefits={benefits}
              onPress={() => {
                //to add: passing Benefit object
                navigation.push('BenefitDescriptionScreen');
              }}
              //backgroundColor based on affordability
              customBenefitTileStyle={{ width: '100%', height: 60 }}
            />
          </View>
          <View style={[styles.buttonsContainer, { marginTop: '10%' }]}>
            <CustomButton
              onPress={() => alert('Work in progress')}
              title='Cancel'
              customButtonStyle={styles.button}
            />
            <CustomButton
              onPress={() => alert('Work in progress')}
              title='Save'
              customButtonStyle={styles.button}
            />
          </View>
        </View>
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
    gap: 100,
  },
  benefitsContainer: {
    width: '90%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '2.5%',
    borderColor: '#000',
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
    marginTop: '1.125%',
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
});
