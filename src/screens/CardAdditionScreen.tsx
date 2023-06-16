import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, SafeAreaView, View } from 'react-native';
import CustomButton from '../components/Miscellaneous/CustomButton';

import StyleBase from '../styles/StyleBase';
import TopBar from '../components/Bars/TopBar';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import CardList from '../components/Cards/CardList';
import useOnPressHandlers from '../hooks/useOnPressHandlers';

import * as api from '../api';
import { fetchNonAddedCards, fetchVirtualCards } from '../utils/fetchCards';
import CenteredLoader from '../components/CenteredLoader';
import colors from '../constants/colors';

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

  const handleChangeScreenMode = (mode) => {
    setAvailableCards(null);
    setFilteredCards(null);
    setScreenMode(mode);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <CustomButton onPress={() => handleChangeScreenMode('virtual')} title='virtual card' />
          <CustomButton onPress={() => handleChangeScreenMode('real')} title='real card' />
        </>
      )}

      {(screenMode === 'virtual' || screenMode === 'real') && (
        <>
          {filteredCards !== null && <SearchBar onChangeText={setCardQuery} value={cardQuery} />}
          {filteredCards === null && <CenteredLoader animation='loader' />}
          <View style={[StyleBase.container, StyleBase.listContainer]}>
            {Boolean(filteredCards?.length) && (
              <CardList
                cards={filteredCards.map((obj) => ({
                  ...obj,
                  isAdded: false,
                  type: screenMode === 'virtual' ? 'virtual' : 'local',
                }))}
              />
            )}
            {filteredCards !== null && !filteredCards.length && screenMode === 'real' && (
              <Text style={styles.textStyle}>No cards found</Text>
            )}
            {filteredCards !== null && !filteredCards.length && screenMode === 'virtual' && (
              <Text style={styles.textStyle}>Find business</Text>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.swWhite,
  },
  textStyle: {
    textAlign: 'center',
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
