import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import TopBar from '../components/Bars/TopBar';
import CardTile from '../components/Cards/CardTile';
import ListItemSeparator from '../components/Miscellaneous/ListItemSeparator';
import CustomButton from '../components/Miscellaneous/CustomButton';

import StyleBase from '../styles/StyleBase';
import SearchBar from '../components/Bars/SearchBar/SearchBar';

/*
todo:
      make search maintain proper screen composition
*/

const cards = [
  {
    name: 'Biedronka',
    image: require('../assets/images/biedronka_homepage.jpg'),
  },
  {
    name: 'Lidl',
    image: require('../assets/images/lidl.png'),
  },
  {
    name: 'Akbar brothers',
    image: require('../assets/images/akbar.png'),
  },
  {
    name: 'Costadoro Coffee',
    image: require('../assets/images/costadoro.png'),
  },
  {
    name: 'Decathlon',
    image: require('../assets/images/decathlon.png'),
  },
  {
    name: 'Deichmann',
    image: require('../assets/images/deichmann.png'),
  },
  {
    name: 'Espirit',
    image: require('../assets/images/espirit.png'),
  },
  {
    name: 'Kaufland',
    image: require('../assets/images/kaufland.png'),
  },
  {
    name: 'Maggi spices',
    image: require('../assets/images/maggi.png'),
  },
  {
    name: 'Pollo Feliz',
    image: require('../assets/images/pollofeliz.png'),
  },
  {
    name: 'Roblox',
    image: require('../assets/images/roblox.png'),
  },
  {
    name: 'Stock',
    image: require('../assets/images/stock.png'),
  },
];

export default function MainScreen({ navigation }) {
  const [cardQuery, setCardQuery] = useState('');
  const [filter, setFilter] = useState(null);
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    const lowerCaseCardQuery = cardQuery.toLowerCase();
    const cardsWithSearchedName = cards.filter((card) =>
      card.name.toLowerCase().includes(lowerCaseCardQuery)
    );

    setFilteredCards(cardsWithSearchedName);
  }, [cardQuery]);

  // useEffect(() => {}, [filter]);

  return (
    <View style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <TopBar
        iconLeft='menu'
        onPressLeft={() => alert('Work in progress')}
        iconRight='filter-menu-outline'
        onPressRight={() => alert('Work in progress')}
      />
      <SearchBar onChangeText={setCardQuery} value={cardQuery} />
      <FlatList
        data={filteredCards}
        renderItem={({ item }) => (
          <CardTile image={item.image} onPress={() => navigation.push('CardInfoScreen')} />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
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
      <StatusBar barStyle='default' />
    </View>
  );
}
