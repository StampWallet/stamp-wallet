import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  iconLeft: string;
  iconLeftColor?: string;
  onPressLeft: any;
  iconRight?: string;
  iconRightColor?: string;
  onPressRight?: any;
}

const TopBar = ({
  iconLeft,
  iconLeftColor = 'white',
  onPressLeft,
  iconRight,
  iconRightColor = 'white',
  onPressRight,
}: Props) => (
  <View style={styles.topBar}>
    <View style={styles.container}>
      <View style={styles.containerIcon}>
        <Icon name={iconLeft} size={30} onPress={onPressLeft} style={{ color: iconLeftColor }} />
      </View>
      <View style={styles.containerIcon}>
        {iconRight && (
          <Icon
            name={iconRight}
            size={30}
            onPress={onPressRight}
            style={{ color: iconRightColor }}
          />
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBar: {
    height: 55, //temp
    //height: '6.125%',
    width: '100%',
    backgroundColor: '#50AAEB',
    position: 'absolute',
    left: 0,
    top: 0,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  containerIcon: {
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
  },
});

export default TopBar;
