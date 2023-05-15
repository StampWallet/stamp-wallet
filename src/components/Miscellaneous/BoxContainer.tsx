import React from 'react';
import { StyleSheet, View } from 'react-native';

const BoxContainer = (props) => {
  return <View style={{ ...styles.boxContainer, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  boxContainer: {
    height: 200,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BoxContainer;
