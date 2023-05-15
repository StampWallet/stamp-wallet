import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Pressable } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import useOnPressHandlers from '../hooks/useOnPressHandlers';

import StyleBase from '../styles/StyleBase';

import TopBar from '../components/Bars/TopBar';
import TapBar from '../components/Bars/TapBar';
import CardTile from '../components/Cards/CardTile';
import Tile from '../components/Miscellaneous/Tile';
import BenefitTile from '../components/Benefits/BenefitTile';
import CustomButton from '../components/Miscellaneous/CustomButton';
import BoxContainer from '../components/Miscellaneous/BoxContainer';

const SHOW_VIRTUAL = 1;

export default function CardInfoScreen({ navigation, Card }) {
  /*
  todo:
  check if virtual or real
  style components to match figma prototype
  ^status as of rn: chaos
  proper card icon
  proper account balance from api
  proper descriptions
  proper everything (after api implementation)
  */

  const [screenState, setState] = useState(1);

  const { onPressBack } = useOnPressHandlers();

  const benefits = [
    {
      publicId: 1,
      name: 'test',
      price: 100,
    },
    {
      publicId: 2,
      name: 'test2',
      price: 200,
    },
    {
      publicId: 3,
      name: 'test3',
      price: 300,
    },
  ];

  return SHOW_VIRTUAL ? (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft={'arrow-left'} onPressLeft={() => onPressBack(navigation)} />
      {/* todo: apply paddings
                image as Card.businessDetails.iconImageId */}
      {/*temp solution - Tile of CardTile style override */}
      <View style={styles.cardTile}>
        <CardTile image={require('../assets/biedronka_homepage.jpg')} onPress={() => {}} />
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
          <Tile style={{ alignItems: 'center', justifyContent: 'center', width: 175, height: 60 }}>
            <Text>Business</Text>
          </Tile>
        </Pressable>
        <Pressable
          onPress={() => {
            setState(0);
          }}
        >
          <Tile style={{ alignItems: 'center', justifyContent: 'center', width: 175, height: 60 }}>
            <Text>Benefits</Text>
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
            <Text style={styles.text}>Business name</Text>
            <Text style={styles.text}>Address</Text>
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
            />
          </View>
          <View style={[styles.buttonsContainer, { paddingTop: '7.5%' }]}>
            <Pressable onPress={() => alert('Work in progress')}>
              <Tile
                style={{ alignItems: 'center', justifyContent: 'center', width: 175, height: 60 }}
              >
                <Text>Cancel</Text>
              </Tile>
            </Pressable>
            <Pressable onPress={() => alert('Work in progress')}>
              <Tile
                style={{ alignItems: 'center', justifyContent: 'center', width: 175, height: 60 }}
              >
                <Text>Save</Text>
              </Tile>
            </Pressable>
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
  boxContainer: {
    height: '53.75%',
    width: '89.72%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.swViolet,
    borderRadius: 10,
    marginTop: '1.5%',
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
  showCard: {
    //marginTop: '2.375%',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
  container: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
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
});
