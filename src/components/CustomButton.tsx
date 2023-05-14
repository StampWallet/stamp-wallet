import React from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

import colors from '../constants/colors';

interface ICustomButton {
  // eslint-disable-next-line no-unused-vars
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  type?: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<ViewStyle>;
}
const CustomButton = ({
  onPress,
  title,
  type,
  customButtonStyle,
  customTextStyle,
}: ICustomButton) => {
  const buttonStyle = StyleSheet.flatten([
    styles.buttonContainer,
    { ...(type === 'primary' ? { ...styles.buttonPrimary } : { ...styles.buttonSecondary }) },
    customButtonStyle,
  ]);
  const textStyle = StyleSheet.flatten([styles.buttonText, customTextStyle]);

  return (
    <Pressable onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

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
