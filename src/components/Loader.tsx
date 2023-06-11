import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const animations = {
  loader: require('../assets/lottie/loader.json'),
  success: require('../assets/lottie/success.json'),
  error: require('../assets/lottie/error.json'),
};

interface Props {
  animation: string;
}

const Loader = ({ animation }: Props) => (
  <View>
    <AnimatedLottieView source={animations[animation]} style={styles.animation} autoPlay />
  </View>
);

const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
});

export default Loader;
