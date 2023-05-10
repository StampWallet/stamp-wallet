import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { swUnderlineBlue, swWhite } from '../constants/colors';

interface IInputField {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  secureTextEntry?: boolean;
}

const InputField = ({ value, setValue, placeholder, secureTextEntry }: IInputField) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

InputField.defaultProps = {
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: swWhite,
    width: '100%',
    borderBottomColor: swUnderlineBlue,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 10,
  },
  input: {},
});

export default InputField;
