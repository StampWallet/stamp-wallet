import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface TileProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Tile = ({ style, children }: TileProps) => (
  <View style={[styles.tile, style]}>{children}</View>
);

const styles = StyleSheet.create({
  tile: {
    height: 75,
    width: 350,
    borderRadius: 15,
    overflow: 'hidden',
    shadowOpacity: 10,
  },
});

export default Tile;
