import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import useOnPressHandlers from '../../hooks/useOnPressHandlers';
import colors from '../../constants/colors';

interface Props {
  tapBarState?: 'default' | 'deletion';
  callbackFn?: () => void;
}

const TapBar = ({ tapBarState, callbackFn }: Props) => {
  const navigation = useNavigation();
  const { onPressBackHome, onPressCardAddition } = useOnPressHandlers();

  return (
    <View style={styles.TapBar}>
      <View style={styles.container}>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={() => onPressBackHome(navigation)}>
            <Icon name='home-outline' size={35} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={() => onPressCardAddition(navigation)}>
            <Icon name='plus-circle-outline' size={35} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={callbackFn}>
            <Icon
              name={tapBarState === 'default' ? 'delete' : 'close-thick'}
              size={35}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TapBar: {
    backgroundColor: '#50AAEB',
    height: 50,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerIcon: {
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  icon: {
    color: colors.swWhite,
  },
});

export default TapBar;
