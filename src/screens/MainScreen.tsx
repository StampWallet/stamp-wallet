import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList, Text, StyleSheet } from 'react-native';

import TopBar from '../components/Bars/TopBar';
import CardTile from '../components/Cards/CardTile';
import ListItemSeparator from '../components/Miscellaneous/ListItemSeparator';
import CustomButton from '../components/Miscellaneous/CustomButton';
import StyleBase from '../styles/StyleBase';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import SortOptions from '../components/Bars/SearchBar/SortOptions';

import { OptionKey } from '../components/Bars/SearchBar/OptionRow';

import filterCards from '../utils/filterCards';

/*
todo:
      make search maintain proper screen composition
*/

const cards = [
  {
    name: 'Biedronka',
    image: require('../assets/images/biedronka_homepage.jpg'),
    type: 'virtual',
  },
  {
    name: 'Lidl',
    image: require('../assets/images/lidl.png'),
    type: 'virtual',
  },
  {
    name: 'Akbar brothers',
    image: require('../assets/images/akbar.png'),
    type: 'real',
  },
  {
    name: 'Costadoro Coffee',
    image: require('../assets/images/costadoro.png'),
    type: 'virtual',
  },
  {
    name: 'Decathlon',
    image: require('../assets/images/decathlon.png'),
    type: 'real',
  },
  {
    name: 'Deichmann',
    image: require('../assets/images/deichmann.png'),
    type: 'real',
  },
  {
    name: 'Espirit',
    image: require('../assets/images/espirit.png'),
    type: 'virtual',
  },
  {
    name: 'Kaufland',
    image: require('../assets/images/kaufland.png'),
    type: 'real',
  },
  {
    name: 'Maggi spices',
    image: require('../assets/images/maggi.png'),
    type: 'virtual',
  },
  {
    name: 'Pollo Feliz',

    image: require('../assets/images/pollofeliz.png'),
    type: 'real',
  },
  {
    name: 'Roblox',
    image: require('../assets/images/roblox.png'),
    type: 'real',
  },
  {
    name: 'Stock',
    image: require('../assets/images/stock.png'),
    type: 'virtual',
  },
];

export default function MainScreen({ navigation }) {
  const [cardQuery, setCardQuery] = useState('');
  const [isFilterDropdownOpen, setFilterDropdownVisibility] = useState(false);
  const [filter, setFilter] = useState<OptionKey | null>(null);
  const [filteredCards, setFilteredCards] = useState(cards);

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
          styles.listContainer,
        ]}
      >
        {filteredCards.length ? (
          <FlatList
            data={filteredCards}
            renderItem={({ item }) => (
              <CardTile image={item.image} onPress={() => navigation.push('CardInfoScreen')} />
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
