import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, Text } from 'react-native';

import TopBar from '../components/Bars/TopBar';
import CardList from '../components/Cards/CardList';
import CustomButton from '../components/Miscellaneous/CustomButton';

import useOnPressHandlers from '../hooks/useOnPressHandlers';

import StyleBase from '../styles/StyleBase';
import SearchBar from '../components/Bars/SearchBar/SearchBar';
import SortOptions from '../components/Bars/SearchBar/SortOptions';
import CustomModal from '../components/Modals/CustomModal';

import { OptionKey } from '../components/Bars/SearchBar/OptionRow';
import * as api from '../api';

import filterCards from '../utils/filterCards';
import { fetchUserCards } from '../utils/fetchCards';

import colors from '../constants/colors';
import TapBar from '../components/Bars/TapBar';
import Auth from '../database/Auth';
import Loader from '../components/Loader';
import CenteredLoader from '../components/CenteredLoader';

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
  const [cards, setCards] = useState(null);
  // const [benefits, setBenefits] = useState([]);
  const [filteredCards, setFilteredCards] = useState(cards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletionMode, setDeletionMode] = useState(false);
  const [mainScreenMode, setMainScreenMode] = useState<'customer' | 'business'>('customer');
  const [cardToDelete, setCardToDelete] = useState(null);

  const { onPressCard } = useOnPressHandlers();

  // TODO ADD ADAPTER FOR IMAGE URLS
  useEffect(() => {
    fetchUserCards(setCards);
  }, []);

  // filters cards based on search query + current filter
  useEffect(() => {
    if (!cards || !cards.length) {
      return;
    }

    let cardList = cards;

    if (filter) {
      const { name, type } = filter;
      cardList = filterCards(name, type, cards);
    }

    const lowerCaseCardQuery = cardQuery.toLowerCase();
    const cardsWithSearchedName = cardList.filter((card) => {
      const cardName = card.name ? card.name : card.businessDetails.name;
      return cardName.toLowerCase().includes(lowerCaseCardQuery);
    });
    setFilteredCards(cardsWithSearchedName);
  }, [cards, filter, cardQuery]);

  const handleOnDelete = (card) => {
    setCardToDelete(card);
    setIsModalOpen(true);
  };

  const confirmDeleteAction = async () => {
    if (!cardToDelete) {
      setIsModalOpen(false);
      return;
    }

    const isLocal = Boolean(cardToDelete.imageUrl);
    const header = Auth.getAuthHeader();

    if (isLocal) {
      const LCA = new api.LocalCardsApi();
      const cardId = cardToDelete.publicId;
      try {
        const deleteResponse = await LCA.deleteLocalCard(cardId, header);
        const virtualCards = cards.filter((card) => Boolean(card.businessDetails));
        const localCards = cards.filter((card) =>
          Boolean(card.name && card.publicId !== cardToDelete.publicId)
        );

        const filteredCardsWithRemovedDeletedCard = filteredCards.filter((card) => {
          if (card.businessDetails) {
            return true;
          }

          return card.publicId !== cardToDelete.publicId;
        });

        setCards([...localCards, ...virtualCards]);
        setFilteredCards([...filteredCardsWithRemovedDeletedCard]);
      } catch (e) {
        console.log(e);
      }

      setIsModalOpen(false);
      setCardToDelete(null);
      return;
    }

    const VCA = new api.VirtualCardsApi();
    const {
      businessDetails: { businessId },
    } = cardToDelete;
    try {
      const deleteResponse = await VCA.deleteVirtualCard(businessId, header);
      const localCards = cards.filter((card) => Boolean(card.name));
      const virtualCards = cards.filter((card) =>
        Boolean(card.businessDetails && card.businessDetails.businessId !== businessId)
      );
      const filteredCardswithRemovedDeletedCard = filteredCards.filter((card) => {
        if (card.name) {
          return true;
        }

        return card.businessDetails.businessId !== businessId;
      });

      setCards([...localCards, ...virtualCards]);
      setFilteredCards([...filteredCardswithRemovedDeletedCard]);
    } catch (e) {
      console.log(e);
    }

    setIsModalOpen(false);
    setCardToDelete(null);
  };

  return (
    <SafeAreaView style={StyleBase.container}>
      <CustomModal
        header={`Are you sure you want to delete this ${
          mainScreenMode === 'customer' ? 'card' : 'benefit'
        }?`}
        description={`${
          mainScreenMode === 'customer'
            ? 'This action cannot be undone, do you wish to proceed?'
            : 'Your clients will have their points returned.'
        }`}
        confirmOption={
          <CustomButton
            onPress={() => confirmDeleteAction()}
            title='confirm'
            customButtonStyle={styles.modalButton}
            customTextStyle={styles.modalButtonText}
          />
        }
        cancelOption={
          <CustomButton
            onPress={() => setIsModalOpen(false)}
            title='cancel'
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
        {filteredCards === null && <Loader animation='loader' />}
        {filteredCards?.length && (
          <CardList
            cards={filteredCards.map((obj) => ({ ...obj, isAdded: true }))}
            onLongCardPress={() => setDeletionMode(true)}
            onPress={(card) => handleOnDelete(card)}
            deletionMode={deletionMode}
          />
        )}
        {filteredCards !== null && !filteredCards.length && <Text>Add your first card!</Text>}
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
