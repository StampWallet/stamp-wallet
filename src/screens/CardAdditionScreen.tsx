import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import CustomButton from '../components/Miscellaneous/CustomButton';

import StyleBase from '../styles/StyleBase';
import TopBar from '../components/Bars/TopBar';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import { cards } from '../../src/assets/mockData/Cards';
import CardList from '../components/Cards/CardList';
import useOnPressHandlers from '../hooks/useOnPressHandlers';
import Scanner from '../components/Scanner';
import { getName } from '../utils/cardGetters';

export default function CardAdditionScreen({ navigation }) {
  const [cardType, setCardType] = useState<'virtual' | 'real' | null>(null);
  const [cardQuery, setCardQuery] = useState('');
  const [availableCards, setAvailableCards] = useState(cards);
  const { onPressBack } = useOnPressHandlers();

  // useEffect(() => {
  //   if (!cardType === 'virtual') {
  //     return;
  //   }
  //
  //   const cardList = cards;
  //

  // }, [cardQuery]);

  useEffect(() => {
    if (!cardType) {
      return;
    }

    const cardList = cards;

    const lowerCaseCardQuery = cardQuery.toLowerCase();
    const cardsWithSearchedName = cardList.filter((card) =>
      getName(card).toLowerCase().includes(lowerCaseCardQuery)
    );
    setAvailableCards(cardsWithSearchedName);
  }, [cardQuery, cardType]);

  return (
    <SafeAreaView style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft='arrow-left' onPressLeft={() => onPressBack(navigation)} />
      {cardType === 'virtual' && (
        <>
          <SearchBar onChangeText={setCardQuery} value={cardQuery} />
          {/*<CardList cards={availableCards} />*/}
          {/* for testing purpose */}
          <CardList cards={availableCards.map((obj) => ({ ...obj, isAdded: false }))} />
        </>
      )}

      {cardType === 'real' && <Scanner />}

      {!cardType && (
        <>
          <Text style={styles.text}>Choose card type</Text>
          <CustomButton onPress={() => setCardType('virtual')} title='virtual card' />
          <CustomButton onPress={() => setCardType('real')} title='real card' />
        </>
      )}
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
