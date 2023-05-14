import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native';

import Tile from '../Miscellaneous/Tile';

//todo: source = proper business banner

//seems to work
interface CardTileProps {
  image: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
}

const CardTile = ({ image, onPress }: CardTileProps) => {
  return (
    <Pressable onPress={onPress}>
      <Tile>
        <Image style={styles.image} source={image} resizeMode='contain' />
      </Tile>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
});

export default CardTile;
