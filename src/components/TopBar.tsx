import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TopBarProps {
  iconLeft: any;
  onPressLeft: any;
  iconRight?: any;
  onPressRight?: any;
}

const TopBar = ({ iconLeft, onPressLeft, iconRight, onPressRight }: TopBarProps) => {
  return (
    <View style={styles.TopBar}>
      <View style={styles.container}>
        <View style={styles.containerIcon}>
          <Icon name={iconLeft} size={30} onPress={onPressLeft} />
        </View>
        <View style={styles.containerIcon}>
          {iconRight && <Icon name={iconRight} size={30} onPress={onPressRight} />}
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
    height: 40, //temp
    //height: '6.125%',
    width: '100%',
    backgroundColor: '#50AAEB',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  containerIcon: {
    paddingLeft: 20,
    justifyContent: 'center',
  },
});

export default TopBar;
