import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Tile from './Tile';

interface BenefitTileProps {
  name: string;
  color: any;
  children: any;
}

const BenefitTile = ({ name, color, children }: BenefitTileProps) => {
  return (
    <Tile color={color}>
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Text style={styles.text}>{name}</Text>
        </View>
        {children}
      </View>
    </Tile>
  );
};

/*
const BenefitTile = ({ name, color, children }: BenefitTileProps) => {
  return (
    <Tile color={color}>
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.containerRight}>
          <View style={styles.containerInRow}>
            <Text style={styles.text}>200</Text>
            <Icon name="menu-right" size={35} />
          </View>
        </View>
      </View>
    </Tile>
  );
};
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerLeft: {
    padding: 10,
    height: '100%',
    width: '75%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  containerRight: {
    padding: 10,
    width: '25%',
    height: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  containerInRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//      <View style={styles.containerRight}>{children}</View>

export default BenefitTile;
