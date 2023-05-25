import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import TopBar from '../components/Bars/TopBar';
import CardList from '../components/Cards/CardList';
import CustomButton from '../components/Miscellaneous/CustomButton';
import StyleBase from '../styles/StyleBase';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import SortOptions from '../components/Bars/SearchBar/SortOptions';

import { OptionKey } from '../components/Bars/SearchBar/OptionRow';

import filterCards from '../utils/filterCards';

import cards from '../mockData/cards';

/*
todo:
      make search maintain proper screen composition

todo:
      get cards from database entity
*/

export default function MainScreen({ navigation }) {
  const [cardQuery, setCardQuery] = useState('');
  const [isFilterDropdownOpen, setFilterDropdownVisibility] = useState(false);
  const [filter, setFilter] = useState<OptionKey | null>(null);
  const [filteredCards, setFilteredCards] = useState(cards);

  // filters cards based on search query + current filter
  useEffect(() => {
    let cardList = cards;

    if (filter) {
      const { name, type } = filter;
      cardList = filterCards(name, type, cards);
    }

    const lowerCaseCardQuery = cardQuery.toLowerCase();
    const cardsWithSearchedName = cardList.filter((card) =>
      card.name.toLowerCase().includes(lowerCaseCardQuery)
    );
    setFilteredCards(cardsWithSearchedName);
  }, [filter, cardQuery]);

  return (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar
        iconLeft='menu'
        onPressLeft={() => alert('Work in progress')}
        iconRight='filter-menu-outline'
        onPressRight={() => setFilterDropdownVisibility((prevState) => !prevState)}
      />
      <SearchBar onChangeText={setCardQuery} value={cardQuery} />
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
        <CardList cards={filteredCards} />
        {/* TODO: swap this button with tap bars addition option*/}
        <CustomButton
          onPress={() => navigation.push('CardAdditionScreen')}
          title='To card addition'
        />
        <CustomButton
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            })
          }
          title='Back to home'
        />
      </View>
      <StatusBar barStyle='default' />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyList: {
    fontSize: 24,
  },
  listOpacity: {
    opacity: 0.5,
  },
});
