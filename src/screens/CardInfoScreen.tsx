import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import TopBar from '../components/TopBar';
import TapBar from '../components/TapBar';
import CardTile from '../components/CardTile';
import Tile from '../components/Tile';
import BenefitTile from '../components/BenefitTile';
import CustomButton from '../components/CustomButton';
import BoxContainer from '../components/BoxContainer';

const SHOW_VIRTUAL = 1;

export default function CardInfoScreen({ navigation, Card }) {
  /*
  todo:
  check if virtual or real - if real barcode if virtual as implemented now
  style components to match figma prototype
  ^status as of rn: chaos
  proper card icon
  proper account balance from api
  proper descriptions
  proper everything (after api implementation)
  */

  if (SHOW_VIRTUAL /* */) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='default' />
        <TopBar iconLeft={'arrow-left'} onPressLeft={() => navigation.pop()} />
        {/* todo: apply paddings
                  image as Card.businessDetails.iconImageId */}
        <CardTile image={require('../assets/biedronka_homepage.jpg')} onPress={() => {}} />
        <Tile>
          <View style={styles.accountTileContainer}>
            <Text style={styles.text}>Account balance</Text>
            <Text style={styles.text}>100</Text>
          </View>
        </Tile>
        <View style={styles.buttonsContainer}>
          {/* todo: custom button styles to fit screen
                    or make them cardtiles instead but without image?
                    implement onPress   */}
          <CustomButton onPress={() => alert('Work in progress')} title='Business' />
          <CustomButton onPress={() => alert('Work in progress')} title='Benefits' />
        </View>
        {/* everything below is in temp form, what is rendered will be based on button^ pressed */}
        <BoxContainer style={styles.boxContainer}>
          <Text style={styles.text}>Business name</Text>
          <Text style={styles.text}>Address</Text>
          <Text style={styles.text}>Info</Text>
        </BoxContainer>
        {/* todo: apply proper paddings */}
        <CustomButton onPress={() => alert('Work in progress')} title='Claim Benefits' />
        <CustomButton onPress={() => alert('Work in progress')} title='Show Card' />
        <TapBar navigation={navigation} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TopBar iconLeft={'arrow-left'} onPressLeft={() => navigation.pop()} />
        <Text>This is real card info</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxContainer: {
    height: 200,
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#C9CDFF',
    borderRadius: 15,
  },
  buttonsContainer: {
    height: 100,
    //backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#0F6BAE',
    borderRadius: 22,
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    width: '40%',
    height: 55,
  },
  accountTileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', //temp
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
});
