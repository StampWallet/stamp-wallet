import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//todo: make icons size be consistent with figma prototypes

const TapBar = (props) => {
  return (
    <View style={styles.TapBar}>
      <View style={styles.container}>
        <View style={styles.containerIcon}>
          <Icon name="home-outline" onPress={() => alert('Work in progress')} size={30} />
        </View>
        <View style={styles.containerIcon}>
          <Icon name="plus-circle-outline" onPress={() => alert('Work in progress')} size={30} />
        </View>
        <View style={styles.containerIcon}>
          <Icon name="map-search-outline" onPress={() => alert('Work in progress')} size={30} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TapBar: {
    backgroundColor: '#50AAEB',
    height: '6.125%',
    marginTop: 'auto',
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    gap: 100,
  },
  containerIcon: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
});

export default TapBar;
