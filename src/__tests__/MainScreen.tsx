import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, waitFor } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import MainScreen from '../screens/MainScreen';

describe('MainScreen', () => {
  it('filters available cards', () => {
    const { getByTestId } = render(<MainScreen />);
    const onCardSearch = jest.fn();

    const mockSearch = getByTestId('search');
    const searchTerm = 'B';
    fireEvent.changeText(mockSearch, searchTerm);

    expect(onCardSearch).toBeCalledWith(searchTerm);
  });

  it('switches deletion mode on', async () => {
    const tree = render(<MainScreen />);
    const cardTile = tree.getByText('tile');
    const onCardPress = jest.fn();

    fireEvent(cardTile, 'longPress');

    await waitFor(() => expect(onCardPress).toBeCalledWith(true), { timeout: 300 });
  });

  it('scrolls the cards', () => {
    const { getByTestId } = render(<MainScreen />);
    const cardList = getByTestId('card-list');
    const initialPosition = cardList.contentOffset.y;

    fireEvent.scroll(cardList, { nativeEvent: { contentOffset: { y: 100 } } });
    const scrolledPosition = cardList.contentOffset.y;

    expect(scrolledPosition).toBeGreaterThan(initialPosition);
  });

  it('deletes the card', async () => {
    const { queryByTestId, getByTestId } = render(<MainScreen />);
    const onCardDelete = jest.fn();
    const onConfirmDelete = jest.fn();

    const cardToDelete = getByTestId('card1');
    fireEvent.press(cardToDelete);

    expect(onCardDelete).toHaveBeenCalled();
    expect(onConfirmDelete).toHaveBeenCalled();
    await waitFor(() => expect(queryByTestId('card1')).toBeNull(), { timeout: 1000 });
  });
});
