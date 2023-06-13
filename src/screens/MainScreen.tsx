import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, Text } from 'react-native';

import TopBar from '../components/Bars/TopBar';
import CardList from '../components/Cards/CardList';
import CustomButton from '../components/Miscellaneous/CustomButton';

import useOnPressHandlers from '../hooks/useOnPressHandlers';
import { getName, getImage } from '../utils/cardGetters';

import StyleBase from '../styles/StyleBase';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import SortOptions from '../components/Bars/SearchBar/SortOptions';
import CustomModal from '../components/Modals/CustomModal';

import { OptionKey } from '../components/Bars/SearchBar/OptionRow';
import * as api from '../api';

import filterCards from '../utils/filterCards';
import { fetchLocalCards } from '../utils/fetchCards';

import colors from '../constants/colors';
import TapBar from '../components/Bars/TapBar';

import { cards } from '../assets/mockData/Cards';

/*
todo:
      make search maintain proper screen composition

todo:
      get cards from database entity - REMOVE MOCK DATA CARDS in favour of state
*/

export default function MainScreen({ navigation }) {
  const [cardQuery, setCardQuery] = useState('');
  const [isFilterDropdownOpen, setFilterDropdownVisibility] = useState(false);
  const [filter, setFilter] = useState<OptionKey | null>(null);
  // const [cards, setCards] = useState([]);
  // const [benefits, setBenefits] = useState([]);
  const [filteredCards, setFilteredCards] = useState(cards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletionMode, setDeletionMode] = useState(false);
  const [mainScreenMode, setMainScreenMode] = useState<'customer' | 'business'>('customer');

  const { onPressCard } = useOnPressHandlers();

  // filters cards based on search query + current filter
  useEffect(() => {
    if (!cards) {
      return;
    }
    let cardList = cards;

    if (filter) {
      const { name, type } = filter;
      cardList = filterCards(name, type, cards);
    }

    const lowerCaseCardQuery = cardQuery.toLowerCase();
    const cardsWithSearchedName = cardList.filter((card) =>
      getName({ Card: card }).toLowerCase().includes(lowerCaseCardQuery)
    );
    setFilteredCards(cardsWithSearchedName);
  }, [cards, filter, cardQuery]);

  const handleOnDelete = () => {
    setIsModalOpen(true);
  };

  // TODO FIX GETTERS and then check if works properly
  // useEffect(() => {
  //   fetchCards(setCards);
  // }, []);

  return (
    <SafeAreaView style={StyleBase.container}>
      <CustomModal
        header='Are you sure you want to delete this benefit?'
        description='Your clients will have their points returned.'
        confirmOption={
          <CustomButton
            onPress={() => handleOnDelete}
            title='Delete'
            customButtonStyle={styles.modalButton}
            customTextStyle={styles.modalButtonText}
          />
        }
        cancelOption={
          <CustomButton
            onPress={() => setIsModalOpen(false)}
            title='Cancel'
            customButtonStyle={styles.modalButton}
            customTextStyle={styles.modalButtonText}
          />
        }
        isModalOpen={isModalOpen}
      />
      <TopBar
        iconLeft='menu'
        onPressLeft={() => alert('Work in progress')}
        iconRight='filter-menu-outline'
        onPressRight={() => setFilterDropdownVisibility((prevState) => !prevState)}
      />
      <SearchBar onChangeText={setCardQuery} value={cardQuery} deletionMode={deletionMode} />
      {isFilterDropdownOpen && (
        <SortOptions
          setFilter={setFilter}
          filter={filter}
          setFilterDropdownVisibility={setFilterDropdownVisibility}
        />
      )}
      <View
        style={[
          StyleBase.container,
          isFilterDropdownOpen && styles.listOpacity,
          StyleBase.listContainer,
        ]}
      >
        {filteredCards?.length ? (
          <CardList
            cards={filteredCards}
            //cards={filteredCards.map((obj) => ({ ...obj, isAdded: false }))}
            onLongCardPress={() => setDeletionMode(true)}
            onPress={() => handleOnDelete()}
            deletionMode={deletionMode}
            isAdded={true}
          />
        ) : (
          <Text>Add your first card!</Text>
        )}
      </View>
      <TapBar
        callbackFn={() => setDeletionMode((prev) => !prev)}
        tapBarState={deletionMode ? 'deletion' : 'default'}
      />
      <StatusBar barStyle='default' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyList: {
    fontSize: 24,
  },
  listOpacity: {
    opacity: 0.5,
  },
  modalButton: {
    width: '120%',
    height: 50,
    backgroundColor: colors.swWhite,
  },
  modalButtonText: {
    color: colors.swBlack,
    fontSize: 24,
  },
});
