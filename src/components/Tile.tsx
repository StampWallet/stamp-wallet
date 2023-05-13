import React from 'react';
import { View, StyleSheet } from 'react-native';

const Tile = (props) => {
  return <View style={{ ...styles.tile, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#C9CDFF', //temp
    height: 75,
    width: 350,
    borderRadius: 15,
    overflow: 'hidden',
    shadowOpacity: 10,
  },
});

export default Tile;
