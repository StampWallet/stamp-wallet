import React from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';

import Tile from './Tile';

//todo: source = proper business banner

const CardTile = ({ image, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Tile>
        <Image style={styles.image} source={image} resizeMode="contain" />
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
