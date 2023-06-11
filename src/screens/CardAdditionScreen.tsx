import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import CustomButton from '../components/Miscellaneous/CustomButton';

import StyleBase from '../styles/StyleBase';
import TopBar from '../components/Bars/TopBar';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import CardList from '../components/Cards/CardList';
import useOnPressHandlers from '../hooks/useOnPressHandlers';

import * as api from '../api';
import { fetchNonAddedCards, fetchVirtualCards } from '../utils/fetchCards';
import CenteredLoader from '../components/CenteredLoader';

type AdditionScreenMode = 'search' | 'scan' | 'virtual' | 'real' | null;

export default function CardAdditionScreen({ navigation }) {
  const [screenMode, setScreenMode] = useState<AdditionScreenMode>('search');
  const [cardQuery, setCardQuery] = useState('');
  const [availableCards, setAvailableCards] = useState(null);
  const [filteredCards, setFilteredCards] = useState(availableCards);
  const { onPressBack } = useOnPressHandlers();

  useEffect(() => {
    if (!screenMode) {
      return;
    }

    if (screenMode === 'real') {
      fetchNonAddedCards(setAvailableCards);
    }

    if (screenMode === 'virtual') {
      fetchVirtualCards(cardQuery, setAvailableCards);
    }
  }, [screenMode, cardQuery, setAvailableCards]);

  // filters cards based on search query + current filter
  useEffect(() => {
    if (!availableCards) {
      return;
    }

    const lowerCaseCardQuery = cardQuery.toLowerCase();
    const cardsWithSearchedName = availableCards.filter((card) => {
      const cardName = card.name ? card.name : card.businessDetails.name;
      return cardName.toLowerCase().includes(lowerCaseCardQuery);
    });
    setFilteredCards(cardsWithSearchedName);
  }, [availableCards, cardQuery]);

  return (
    <SafeAreaView style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar
        iconLeft='arrow-left'
        onPressLeft={
          screenMode === 'search' ? () => onPressBack(navigation) : () => setScreenMode('search')
        }
      />

      {screenMode === 'search' && (
        <>
          <Text style={styles.text}>Choose card type</Text>
          <CustomButton onPress={() => setScreenMode('virtual')} title='virtual card' />
          <CustomButton onPress={() => setScreenMode('real')} title='real card' />
        </>
      )}

      {(screenMode === 'virtual' || screenMode === 'real') && (
        <>
          <SearchBar onChangeText={setCardQuery} value={cardQuery} />
          {filteredCards === null && <CenteredLoader animation='loader' />}
          {filteredCards?.length && (
            <CardList
              cards={filteredCards.map((obj) => ({
                ...obj,
                isAdded: false,
                type: screenMode === 'virtual' ? 'virtual' : 'local',
              }))}
            />
          )}
          {filteredCards !== null && !filteredCards.length && <Text>No cards found</Text>}
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
