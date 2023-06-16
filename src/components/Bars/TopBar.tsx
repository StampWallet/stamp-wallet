import React from 'react';
import { StyleSheet, View, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';

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
        <TouchableOpacity onPress={onPressLeft}>
          <Icon name={iconLeft} size={30} style={{ color: iconLeftColor }} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerIcon}>
        {iconRight && (
          <TouchableOpacity onPress={onPressRight}>
            <Icon name={iconRight} size={30} style={{ color: iconRightColor }} />
          </TouchableOpacity>
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
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    height: Platform.OS === 'android' ? 40 : 60,
    backgroundColor: colors.swLightBlue,
  },
  containerIcon: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 5,
    justifyContent: 'flex-end',
  },
});

export default TopBar;
