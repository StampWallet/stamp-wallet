import { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useAnimateWidth = (ref) => {
  // useEffect(() => {
  //   const animateWidth = (endWidth) => {
  //     Animated.timing(widthValue, {
  //       toValue: endWidth,
  //       duration: 250,
  //       easing: Easing.linear,
  //       useNativeDriver: false,
  //     }).start();
  //   };
  //
  //   if (condition === null) {
  //     return;
  //   }
  //
  //   if (!condition) {
  //     animateWidth(targetWidth);
  //     return;
  //   }
  //   animateWidth(0);
  // }, [condition, widthValue]);
  //
  // const animatedWidth = { width: widthValue };
  //
  // return { animatedWidth };

  const animateWidth = useCallback(
    (endWidth) => {
      console.log('anim', endWidth, ref);
      Animated.timing(ref, {
        toValue: endWidth,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    },
    [ref]
  );

  return animateWidth;
};

export default useAnimateWidth;
