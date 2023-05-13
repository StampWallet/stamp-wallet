import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Controller, Control, RegisterOptions } from 'react-hook-form';

import colors from '../constants/colors';

interface IHookFormInput {
  control: Control;
  rules?: RegisterOptions;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  isInvalid?: boolean;
}

const HookFormInput = ({
  control,
  rules,
  name,
  placeholder,
  secureTextEntry,
  isInvalid,
}: IHookFormInput) => (
  <View style={styles.wrapper}>
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, isInvalid ? styles.invalidField : {}]}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && <Text style={styles.errorMessage}>{error.message || 'Validation error'}</Text>}
        </>
      )}
    />
  </View>
);

HookFormInput.defaultProps = {
  secureTextEntry: false,
  rules: {},
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  container: {
    display: 'flex',
    backgroundColor: colors.swWhite,
    width: '100%',
    borderBottomColor: colors.swUnderlineBlue,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 10,
  },
  input: {},
  invalidField: {
    borderBottomColor: colors.swRed,
    marginBottom: 5,
  },
  errorMessage: {
    width: '100%',
    color: colors.swRed,
    textAlign: 'right',
    marginBottom: 5,
  },
});

export default HookFormInput;
