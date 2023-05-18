import React, { SetStateAction } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
  onChangeText: SetStateAction<any> | (() => void);
  value: string;
  placeholder?: string;
}

const SearchBar = ({ onChangeText, value, placeholder = 'Search...' }: SearchBarProps) => (
  <View style={styles.container}>
    <TextInput
      style={styles.searchBar}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: 50,
    marginTop: 40,
    marginBottom: 12,
    borderBottomWidth: 2,
  },
  searchBar: {
    fontSize: 24,
    fontFamily: Platform.select({ ios: 'Arial', android: 'Roboto' }),
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
});

export default SearchBar;
