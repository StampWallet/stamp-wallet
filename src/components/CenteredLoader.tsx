import React from 'react';
import Loader from './Loader';
import { View, StyleSheet } from 'react-native';

interface Props {
  animation: string;
}

const CenteredLoader = ({ animation }: Props) => (
  <View style={styles.container}>
    <Loader animation={animation} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    margin: 'auto',
    zIndex: 99,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default CenteredLoader;
