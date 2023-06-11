import React, { SetStateAction } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useOnPressHandlers from '../../hooks/useOnPressHandlers';
import CardTile from './CardTile';
import ListItemSeparator from '../Miscellaneous/ListItemSeparator';
import StyleBase from '../../styles/StyleBase';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  // todo change the type
  cards: any[];
  onLongCardPress?: () => SetStateAction<any>;
  onPress?: (card) => void;
  deletionMode?: boolean;
}

export default function CardList({ cards, onLongCardPress, deletionMode = false, onPress }: Props) {
  const navigation = useNavigation();
  const { onPressCard } = useOnPressHandlers();

  return (
    <View style={[StyleBase.container, { paddingTop: 10 }]}>
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <View>
            <CardTile
              imageUrl={item?.imageUrl ? item.imageUrl : item.businessDetails.bannerImageId}
              onLongCardPress={onLongCardPress}
              onPress={deletionMode ? () => onPress(item) : () => onPressCard(navigation, item)}
              deletionMode={deletionMode}
            />
            {deletionMode && (
              <Icon
                name='delete'
                style={styles.deleteIcon}
                size={40}
                onPress={() => onPress(item)}
              />
            )}
          </View>
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
    color: 'red',
  },
});
