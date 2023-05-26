import React, { SetStateAction } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import useOnPressHandlers from '../../hooks/useOnPressHandlers';
import CardTile from './CardTile';
import ListItemSeparator from '../Miscellaneous/ListItemSeparator';
import StyleBase from '../../styles/StyleBase';

interface Props {
  // todo change the type
  cards: any[];
  onLongCardPress?: () => SetStateAction<any>;
  deletionMode?: boolean;
}

// can use FLASH LIST

export default function CardList({ cards, onLongCardPress, deletionMode = false }: Props) {
  const navigation = useNavigation();
  const { onPressCardInfo } = useOnPressHandlers();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <View style={[StyleBase.container, { paddingTop: 10 }]}>
      {cards.length ? (
        <FlatList
          data={cards}
          renderItem={({ item }) => (
            <View>
              <CardTile
                image={item.image}
                onPress={() => onPressCardInfo(navigation)}
                onLongCardPress={onLongCardPress}
              />
              {/* TODO position correctly the icon*/}
              {/*{deletionMode && <Icon name='delete' style={styles.deleteIcon} size={25} />}*/}
            </View>
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      ) : (
        <Text>No cards found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteIcon: {
    position: 'absolute',
    top: 25,
    right: -10,
    color: 'red',
  },
});
