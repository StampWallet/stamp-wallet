import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { swBlack } from '../constants/colors';

interface ILoader {
  loaderDescription: string;
}

const Loader = ({ loaderDescription }: ILoader) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.indicator} size='large' />
      <Text style={styles.loaderTextStyle}>{loaderDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
  },
  indicator: {},
  loaderTextStyle: {
    color: swBlack,
  },
});

export default Loader;
