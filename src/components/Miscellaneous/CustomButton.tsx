import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import colors from '../../constants/colors';

interface CustomButtonProps {
  // eslint-disable-next-line no-unused-vars
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  type?: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
}
const CustomButton = ({
  onPress,
  title,
  type,
  customButtonStyle,
  customTextStyle,
  children,
}: CustomButtonProps) => {
  const buttonStyle = StyleSheet.flatten([
    styles.buttonContainer,
    // sets primary or secondary button version, can be overloaded with custom style
    { ...(type === 'primary' ? { ...styles.buttonPrimary } : { ...styles.buttonSecondary }) },
    customButtonStyle,
    // this removes padding and border for image being present
    { ...(!title && { padding: 0 }) },
  ]);
  const textStyle = StyleSheet.flatten([styles.buttonText, customTextStyle]);

  return (
    <Pressable onPress={onPress} style={buttonStyle}>
      {title && <Text style={textStyle}>{title}</Text>}
      {!title && children}
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
