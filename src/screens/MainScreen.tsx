import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import TopBar from '../components/Bars/TopBar';
import CardTile from '../components/Cards/CardTile';
import ListItemSeparator from '../components/Miscellaneous/ListItemSeparator';
import CustomButton from '../components/Miscellaneous/CustomButton';

import StyleBase from '../styles/StyleBase';

/*
todo:
      make search maintain proper screen composition
*/

const cards = [
  {
    image: require('../assets/images/biedronka_homepage.jpg'),
  },
  {
    image: require('../assets/images/biedronka_homepage.jpg'),
  },
];

export default function MainScreen({ navigation }) {
  const [text, onChangeText] = useState('');

  return (
    <View style={StyleBase.container}>
      <TopBar
        iconLeft='menu'
        onPressLeft={() => alert('Work in progress')}
        iconRight='filter-menu-outline'
        onPressRight={() => alert('Work in progress')}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholder='Search'
        value={text}
      />
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <CardTile image={item.image} onPress={() => navigation.push('CardInfoScreen')} />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
      <CustomButton
        onPress={() => navigation.push('BenefitManipulationScreen')}
        title='To benefit manipulation'
      />
      <CustomButton
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          })
        }
        title='Back to home'
      />
      <StatusBar barStyle='default' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 40,
    height: 60,
    margin: 12,
    padding: 10,
    fontSize: 20,
    fontFamily: Platform.select({ ios: 'Arial', android: 'Roboto' }),
    fontStyle: 'normal',
    fontWeight: '300',
  },
});
