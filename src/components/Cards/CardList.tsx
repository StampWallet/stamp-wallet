import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useOnPressHandlers from '../../hooks/useOnPressHandlers';
import CardTile from './CardTile';
import ListItemSeparator from '../Miscellaneous/ListItemSeparator';
import StyleBase from '../../styles/StyleBase';

interface Props {
  // todo change the type
  cards: any[];
}

// can use FLASH LIST

export default function CardList({ cards }: Props) {
  const navigation = useNavigation();
  const { onPressCardInfo } = useOnPressHandlers();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <View style={StyleBase.container}>
      {cards.length ? (
        <FlatList
          data={cards}
          renderItem={({ item }) => (
            <CardTile image={item.image} onPress={() => onPressCardInfo(navigation)} />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      ) : (
        <Text>No cards found</Text>
      )}
    </View>
  );
}
