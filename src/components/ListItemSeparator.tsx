import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ListItemSeparatorProps {
  style?: any;
}

function ListItemSeparator({ style }: ListItemSeparatorProps) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 10,
    backgroundColor: '#fff',
  },
});

export default ListItemSeparator;
