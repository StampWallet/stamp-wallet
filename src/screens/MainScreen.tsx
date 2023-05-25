import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList, Text, StyleSheet } from 'react-native';

import TopBar from '../components/Bars/TopBar';
import CardTile from '../components/Cards/CardTile';
import ListItemSeparator from '../components/Miscellaneous/ListItemSeparator';
import CustomButton from '../components/Miscellaneous/CustomButton';

import useOnPressHandlers from '../hooks/useOnPressHandlers';
import { getName, getImage } from '../utils/cardGetters';

import { cards } from '../assets/mockData/Cards';

import StyleBase from '../styles/StyleBase';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import SortOptions from '../components/Bars/SearchBar/SortOptions';

import { OptionKey } from '../components/Bars/SearchBar/OptionRow';

import filterCards from '../utils/filterCards';

export default function MainScreen({ navigation }) {
  const [cardQuery, setCardQuery] = useState('');
  const [isFilterDropdownOpen, setFilterDropdownVisibility] = useState(false);
  const [filter, setFilter] = useState<OptionKey | null>(null);
  const [filteredCards, setFilteredCards] = useState(cards);

  const { onPressCard } = useOnPressHandlers();

  useEffect(() => {
    let cardList = cards;

    if (filter) {
      const { name, type } = filter;
      cardList = filterCards(name, type, cards);
    }

    const lowerCaseCardQuery = cardQuery.toLowerCase();
    const cardsWithSearchedName = cardList.filter((card) =>
      getName(card).toLowerCase().includes(lowerCaseCardQuery)
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
          styles.listContainer,
        ]}
      >
        {filteredCards.length ? (
          <FlatList
            data={filteredCards}
            renderItem={({ item }) => (
              <CardTile image={getImage(item)} onPress={() => onPressCard(navigation, item)} />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />
        ) : (
          <Text style={styles.emptyList}>No cards found</Text>
        )}
        <CustomButton
          onPress={() => navigation.push('BenefitManipulationScreen')}
          title='To benefit manipulation'
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
  listContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});
