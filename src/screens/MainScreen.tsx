import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';

import TopBar from '../components/Bars/TopBar';
import CardList from '../components/Cards/CardList';
import CustomButton from '../components/Miscellaneous/CustomButton';

import useOnPressHandlers from '../hooks/useOnPressHandlers';
import { getName, getImage } from '../utils/cardGetters';

import { cards } from '../assets/mockData/Cards';

import StyleBase from '../styles/StyleBase';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import SortOptions from '../components/Bars/SearchBar/SortOptions';
import CustomModal from '../components/Modals/CustomModal';

import { OptionKey } from '../components/Bars/SearchBar/OptionRow';

import filterCards from '../utils/filterCards';

//<import cards from '../mockData/cards';
import colors from '../constants/colors';

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
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [deletionMode, setDeletionMode] = useState(false);
  const [mainScreenMode, setMainScreenMode] = useState<'customer' | 'business'>('customer');

  const { onPressCard } = useOnPressHandlers();

  // filters cards based on search query + current filter
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

  const handleOnDelete = () => {
    console.log('delete');
  };

  return (
    <SafeAreaView style={StyleBase.container}>
      <StatusBar barStyle='default' />
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
        <CardList
          cards={filteredCards}
          onLongCardPress={() => setDeletionMode(true)}
          deletionMode={deletionMode}
        />
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
        {deletionMode && <CustomButton onPress={() => setDeletionMode(false)} title='Cancel' />}
      </View>
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
