import React, { SetStateAction } from 'react';
import { Platform, StyleSheet, TextInput, View, Text } from 'react-native';

interface SearchBarProps {
  onChangeText: SetStateAction<any> | (() => void);
  value: string;
  placeholder?: string;
  deletionMode?: boolean;
}

const SearchBar = ({
  onChangeText,
  value,
  placeholder = 'Search...',
  deletionMode = false,
}: SearchBarProps) => (
  <View style={styles.container}>
    {deletionMode ? (
      <Text style={styles.deleteHeader}>Tap the card you want to delete.</Text>
    ) : (
      <TextInput
        style={styles.searchBar}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor='black'
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '90%',
    height: 50,
    marginTop: 40,
    marginBottom: 12,
    borderBottomWidth: 2,
  },
  searchBar: {
    fontSize: 24,
    fontFamily: Platform.select({ ios: 'Arial', android: 'Roboto' }),
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 36,
  },
  deleteHeader: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default SearchBar;
