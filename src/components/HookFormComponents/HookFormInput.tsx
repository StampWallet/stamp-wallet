import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Controller, Control, RegisterOptions } from 'react-hook-form';

import colors from '../../constants/colors';
import ErrorField from './ErrorField';

interface IHookFormInput {
  control: Control;
  rules?: RegisterOptions;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  isInvalid?: boolean;
  header?: string;
}

const HookFormInput = ({
  control,
  rules,
  name,
  placeholder,
  secureTextEntry,
  isInvalid,
  header = '',
}: IHookFormInput) => (
  <View style={styles.wrapper}>
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          {Boolean(header) && <Text style={styles.header}>{header}</Text>}
          <View style={[styles.container, isInvalid ? styles.invalidField : {}]}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              autoCapitalize='none'
            />
          </View>
          <ErrorField isVisible={isInvalid} error={error?.message || 'Validation error'} />
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
    borderColor: colors.swUnderlineBlue,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {},
  invalidField: {
    borderColor: colors.swRed,
    marginBottom: 5,
  },
});

export default HookFormInput;
