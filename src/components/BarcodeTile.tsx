import React from 'react';
import Barcode, { Format } from '@kichiyaki/react-native-barcode-generator';
import { View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

interface Props {
  value: string;
  format: Format;
}

export default function BarcodeTile({ value, format }: Props) {
  return (
    <View style={styles.barcodeContainer}>
      <Barcode value={value} format={format} style={styles.barcodeStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  barcodeStyle: {
    transform: [{ scaleY: 1.75 }, { scaleX: 1.5 }],
    width: '60%',
    height: 120,
    justifyContent: 'center',
  },
  barcodeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.swPaleViolet,
    width: '90%',
    height: 450,
    borderRadius: 15,
  },
});
