import React from 'react';
import { View, StyleSheet } from 'react-native';

//padding not working - fix!!!

const Tile = ({ children, color = '#C9CDFF', padding = 0 }) => {
  const styles = StyleSheet.create({
    tile: {
      backgroundColor: color,
      height: 75,
      width: 350,
      borderRadius: 15,
      overflow: 'hidden',
      shadowOpacity: 10,
      padding: padding,
    },
  });

  return <View style={styles.tile}>{children}</View>;
};

export default Tile;
