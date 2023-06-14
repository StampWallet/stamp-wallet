import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import useOnPressHandlers from '../../hooks/useOnPressHandlers';
import colors from '../../constants/colors';
import { ACTIONS } from '../../screens/CardScreen/util/reducer';

interface Props {
  tapBarState?: 'default' | 'deletion' | 'cardScreen';
  callbackFn?: () => void;
  dispatch?: React.Dispatch<any>;
}

const TapBar = ({ tapBarState, callbackFn, dispatch }: Props) => {
  const navigation = useNavigation();
  const { onPressBackHome, onPressCardAddition } = useOnPressHandlers();

  const iconName =
    tapBarState === 'default'
      ? 'delete'
      : tapBarState === 'deletion'
      ? 'close-thick'
      : 'cart-outline';

  return (
    <View style={styles.TapBar}>
      <View style={styles.container}>
        <View style={styles.containerIcon}>
          <TouchableOpacity
            onPress={
              dispatch && dispatch != undefined
                ? () =>
                    dispatch({
                      type: ACTIONS.OPEN_MODAL,
                      payload: () => {
                        dispatch({ type: ACTIONS.CLOSE_MODAL });
                        onPressBackHome(navigation);
                      },
                    })
                : () => {
                    onPressBackHome(navigation);
                  }
            }
          >
            <Icon name='home-outline' size={35} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity
            onPress={
              dispatch && dispatch != undefined
                ? () => {
                    dispatch({
                      type: ACTIONS.OPEN_MODAL,
                      payload: () => {
                        dispatch({ type: ACTIONS.TRANSACTION_CANCEL });
                        dispatch({ type: ACTIONS.SET_SCREEN, payload: 'card' });
                        dispatch({ type: ACTIONS.CLOSE_MODAL });
                        onPressCardAddition(navigation);
                      },
                    });
                  }
                : () => onPressCardAddition(navigation)
            }
          >
            <Icon name='plus-circle-outline' size={35} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={callbackFn}>
            <Icon name={iconName} size={35} style={styles.icon} />
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
