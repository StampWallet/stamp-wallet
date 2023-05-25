import React from 'react';
import {
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

import Tile from '../Miscellaneous/Tile';

interface CardTileProps {
  image: ImageSourcePropType;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  tileStyle?: StyleProp<ViewStyle>;
}

const CardTile = ({ image, onPress, containerStyle, tileStyle }: CardTileProps) => {
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <Tile style={tileStyle}>
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
