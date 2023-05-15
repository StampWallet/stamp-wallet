import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';

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
    backgroundColor: colors.swWhite,
  },
});

export default ListItemSeparator;
