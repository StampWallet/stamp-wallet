import React from 'react';
import { StyleSheet, Pressable, Text, GestureResponderEvent } from 'react-native';

import colors from '../constants/colors';

interface ICustomButton {
  // eslint-disable-next-line no-unused-vars
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  type?: string;
}
const CustomButton = ({ onPress, title, type }: ICustomButton) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.buttonContainer,
      { ...(type === 'primary' ? { ...styles.buttonPrimary } : { ...styles.buttonSecondary }) },
    ]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

CustomButton.defaultProps = {
  type: 'primary',
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 22,
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    height: 55,
  },

  buttonPrimary: {
    backgroundColor: colors.swDarkBlue,
  },

  buttonSecondary: {
    backgroundColor: colors.swPaleViolet,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: colors.swWhite,
    alignSelf: 'center',
    lineHeight: 25,
  },
});

export default CustomButton;
