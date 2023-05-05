import React from 'react';
import { StyleSheet, Pressable, Text, GestureResponderEvent } from 'react-native';

interface ICustomButton {
    // eslint-disable-next-line no-unused-vars
    onPress: (event: GestureResponderEvent) => void,
    title: string,
    style?: string,
}
const CustomButton = ({ onPress, title, style = '' }: ICustomButton) => (
  <Pressable onPress={onPress} style={style ? styles.backButton : styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
)

CustomButton.defaultProps = {
    style: ''
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#0F6BAE",
        borderRadius: 22,
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
        width: '80%',
        height: 55,
    },

    backButton: {
        position: "absolute",
        top: 10,
        left: 10,
        width: 50,
        alignItems: 'center',
        backgroundColor: "#0F6BAE",
        borderRadius: 10,
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: "#F9F6EE",
        alignSelf: "center"
    }
})

export default CustomButton;