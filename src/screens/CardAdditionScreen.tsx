import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import CustomButton from '../components/Miscellaneous/CustomButton';

import StyleBase from '../styles/StyleBase';
import TopBar from '../components/Bars/TopBar';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
// import { cards } from '../assets/mockData/Cards';
import CardList from '../components/Cards/CardList';
import useOnPressHandlers from '../hooks/useOnPressHandlers';
import Scanner from '../components/Scanner';
import { getName } from '../utils/cardGetters';

import * as api from '../api';
import { fetchLocalCards, fetchVirtualCards } from '../utils/fetchCards';

type AdditionScreenMode = 'search' | 'scan' | 'virtual' | 'real' | null;

export default function CardAdditionScreen({ navigation }) {
  const [screenMode, setScreenMode] = useState<AdditionScreenMode>(null);
  const [cardQuery, setCardQuery] = useState('');
  const [availableCards, setAvailableCards] = useState([]);
  const { onPressBack } = useOnPressHandlers();

  console.log(availableCards);

  // useEffect(() => {
  //   if (!cardType) {
  //     return;
  //   }
  //
  //   // cards should come from endpoint - then set it to specific type (or maybe there is a better way to handle it???
  //   // if (cardType === 'virtual') {
  //   //   setAvailableCards(cards.virtualCards);
  //   //   return;
  //   // }
  //   //
  //   // setAvailableCards(cards.realCards);
  // }, [cardQuery, cardType]);

  // useEffect(() => {
  //   if (!cardType) {
  //     return;
  //   }
  //
  //   const cardList = cards;
  //
  //   const lowerCaseCardQuery = cardQuery.toLowerCase();
  //   const cardsWithSearchedName = cardList.filter((card) =>
  //     getName(card).toLowerCase().includes(lowerCaseCardQuery)
  //   );
  //   setAvailableCards(cardsWithSearchedName);
  // }, [cardQuery, cardType]);

  useEffect(() => {
    if (!screenMode) {
      return;
    }

    if (screenMode === 'real') {
      fetchLocalCards(setAvailableCards);
    }

    if (screenMode === 'virtual') {
      fetchVirtualCards(cardQuery, setAvailableCards);
    }
  }, [screenMode, cardQuery, setAvailableCards]);

  return (
    <SafeAreaView style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar
        iconLeft='arrow-left'
        onPressLeft={!screenMode ? () => onPressBack(navigation) : () => setScreenMode(null)}
      />

      {!screenMode && (
        <>
          <Text style={styles.text}>Choose card type</Text>
          <CustomButton onPress={() => setScreenMode('virtual')} title='virtual card' />
          <CustomButton onPress={() => setScreenMode('real')} title='real card' />
        </>
      )}

      {(screenMode === 'virtual' || screenMode === 'real') && (
        <>
          <SearchBar onChangeText={setCardQuery} value={cardQuery} />
          {/*<CardList cards={availableCards} />*/}
          {/* for testing purpose */}
          {availableCards?.length ? (
            <CardList
              cards={availableCards.map((obj) => ({ ...obj, isAdded: false }))}
              isAdded={false}
            />
          ) : (
            <Text>No cards found</Text>
          )}
        </>
      )}

      {/*{cardType === 'real' && <Scanner />}*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstContainer: {
    flex: 1,
    backgroundColor: 'red',
  },

  text: {
    fontWeight: '300',
    fontSize: 24,
  },
});
