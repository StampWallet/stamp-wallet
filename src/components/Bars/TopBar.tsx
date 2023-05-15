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
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 'auto',
  },
  containerIcon: {
    paddingLeft: 20,
    justifyContent: 'center',
  },
});

export default TopBar;
