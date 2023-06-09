import React, { ReactNode, useState } from 'react';
import { StyleSheet, Pressable, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

import colors from '../../constants/colors';

interface CustomButtonProps {
  onPress: () => void;
  title?: string;
  type?: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  mutableColor?: boolean;
}
const CustomButton = ({
  onPress,
  title = '',
  type = 'primary',
  customButtonStyle,
  customTextStyle,
  children,
  mutableColor = true,
}: CustomButtonProps) => {
  const [buttonColor, setButtonColor] = useState<string>(null);
  const buttonStyle = StyleSheet.flatten([
    styles.buttonContainer,
    // sets primary or secondary button version, can be overloaded with custom style
    { ...(type === 'primary' ? { ...styles.buttonPrimary } : { ...styles.buttonSecondary }) },
    customButtonStyle,
    // this removes padding and border for image being present
    { ...(!title && { padding: 0 }) },
    { ...(buttonColor && { backgroundColor: buttonColor }) },
  ]);
  const textStyle = StyleSheet.flatten([styles.buttonText, customTextStyle]);

  return (
    <Pressable
      onPressIn={() => {
        if (!mutableColor) {
          return;
        }
        setButtonColor(colors.swLightBlue);
      }}
      onPressOut={() => {
        if (!mutableColor) {
          onPress();
          return;
        }
        setButtonColor(colors.swDarkBlue);
        onPress();
      }}
      style={buttonStyle}
    >
      {title && <Text style={textStyle}>{title}</Text>}
      {!title && children}
    </Pressable>
  );
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
