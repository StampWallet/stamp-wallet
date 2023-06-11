import React from 'react';
import { Text, FlatList, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ACTIONS } from '../../screens/CardScreen/util/reducer';

import { Benefit, InventoryElem } from '../../types';

import colors from '../../constants/colors';

import BenefitTile from './BenefitTile';
import ListItemSeparator from '../Miscellaneous/ListItemSeparator';

interface BenefitListProps {
  benefits: (Benefit | InventoryElem | any)[]; //temp
  customListStyle?: StyleProp<ViewStyle>;
  customBenefitTileStyle?: StyleProp<ViewStyle>;
  dispatch?: React.Dispatch<any>;
  mode: 'addToInventory' | 'addToRealization' | 'preview';
}

const BenefitList = ({
  benefits,
  customListStyle,
  customBenefitTileStyle,
  dispatch,
  mode,
}: BenefitListProps) => {
  const listStyle = StyleSheet.flatten([styles.container, customListStyle]);

  function getBenefitStyle(item) {
    const benefitStyle = StyleSheet.flatten([styles.benefit, customBenefitTileStyle]);
    if (mode === 'addToRealization' && item.amountToRealize === 0)
      return [benefitStyle, { backgroundColor: colors.swPaleGreen }];
    return benefitStyle;
  }

  const isAddingToInventory = mode === 'addToInventory';

  return (
    <View style={listStyle}>
      <FlatList
        data={benefits}
        keyExtractor={(benefit) => benefit.publicId}
        renderItem={({ item }) => (
          <BenefitTile
            name={item.name}
            onPress={
              isAddingToInventory
                ? () =>
                    dispatch({
                      type: ACTIONS.SET_BENEFIT_SCREEN,
                      payload: { screenState: 'benefit', benefit: item },
                    })
                : () => {}
            }
            tileStyle={getBenefitStyle(item)}
          >
            {'price' in item && (
              <View style={styles.containerRight}>
                <View style={styles.containerInRow}>
                  <Text style={styles.text}>{item.price}</Text>
                  <Icon name='menu-right' size={35} />
                </View>
              </View>
            )}
            {'amount' in item && (
              <View style={[styles.containerRight, { width: '30%' }]}>
                <View style={styles.containerInRow}>
                  <Icon
                    name='minus-circle-outline'
                    size={25}
                    onPress={() => {
                      dispatch({ type: ACTIONS.REALIZATION_SUB, payload: item });
                    }}
                  />
                  <Text style={{ fontSize: 25, padding: 10 }}>
                    {item.amountToRealize} / {item.amount}
                  </Text>
                  <Icon
                    name='plus-circle-outline'
                    size={25}
                    onPress={() => {
                      dispatch({ type: ACTIONS.REALIZATION_INCREMENT, payload: item });
                    }}
                    style={{ paddingRight: 25 }}
                  />
                </View>
              </View>
            )}
          </BenefitTile>
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  benefit: {
    backgroundColor: colors.swStrongGreen,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: 3,
  },
  containerRight: {
    padding: 10,
    width: '25%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  containerInRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default BenefitList;
