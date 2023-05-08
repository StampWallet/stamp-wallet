import React from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import Tile from './Tile';

const CardTile = ({ image, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Tile>
        <Image style={styles.image} source={image} resizeMode="contain" />
      </Tile>
    </TouchableWithoutFeedback>
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
