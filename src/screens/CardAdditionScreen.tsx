import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import CustomButton from '../components/Miscellaneous/CustomButton';

import StyleBase from '../styles/StyleBase';
import TopBar from '../components/Bars/TopBar';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import cards from '../mockData/cards';
import CardList from '../components/Cards/CardList';
import useOnPressHandlers from '../hooks/useOnPressHandlers';

export default function CardAdditionScreen({ navigation }) {
  const [cardType, setCardType] = useState<'virtual' | 'real' | null>(null);
  const [cardQuery, setCardQuery] = useState('');
  const [availableCards, setAvailableCards] = useState(cards);
  const { onPressBack } = useOnPressHandlers();

  useEffect(() => {
    if (!cardType) {
      return;
    }

    // cards should come from endpoint - then set it to specific type (or maybe there is a better way to handle it???
    // if (cardType === 'virtual') {
    //   setAvailableCards(cards.virtualCards);
    //   return;
    // }
    //
    // setAvailableCards(cards.realCards);
  }, [cardQuery, cardType]);

  useEffect(() => {
    if (!cardType) {
      return;
    }

    const cardList = cards;

    const lowerCaseCardQuery = cardQuery.toLowerCase();
    const cardsWithSearchedName = cardList.filter((card) =>
      card.name.toLowerCase().includes(lowerCaseCardQuery)
    );
    setAvailableCards(cardsWithSearchedName);
  }, [cardQuery, cardType]);

  return (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar iconLeft='arrow-left' onPressLeft={() => onPressBack(navigation)} />
      {cardType && (
        <>
          <SearchBar onChangeText={setCardQuery} value={cardQuery} />
          <CardList cards={availableCards} />
        </>
      )}

      {!cardType && (
        <>
          <Text style={styles.text}>Choose card type</Text>
          <CustomButton onPress={() => setCardType('virtual')} title='virtual card' />
          <CustomButton onPress={() => setCardType('real')} title='real card' />
        </>
      )}
    </View>
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
