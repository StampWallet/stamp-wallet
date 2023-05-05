import React from 'react';
import { View, StyleSheet } from 'react-native';

interface TileProps {
  children: any;
  color?: any;
}

const Tile = ({ children, color }: TileProps) => {
  return <View style={[styles.tile, { backgroundColor: color }]}>{children}</View>;
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#C9CDFF', //temp
    height: 75,
    width: 350,
    borderRadius: 15,
    overflow: 'visible',
    shadowOpacity: 10,
  },
});

export default Tile;
