import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TopBar = (props) => {
  return (
    <View style={styles.TopBar}>
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Icon name="menu" size={30} onPress={() => alert('Work in progress')} />
        </View>
        <View style={styles.containerRight}>
          <Icon name="filter-menu-outline" size={30} onPress={() => alert('Work in progress')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 300,
  },
  TopBar: {
    height: 125,
    backgroundColor: '#50AAEB',
    flex: 0.1,
  },
  containerLeft: {
    paddingLeft: 20,
    justifyContent: 'center',
  },
  containerRight: {
    paddingRight: 20,
    justifyContent: 'center',
  },
});

export default TopBar;
