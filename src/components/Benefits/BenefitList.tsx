import React, { useState } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ACTIONS } from '../../screens/CardScreen/util/reducer';

import { Benefit, InventoryElem } from '../../types';

import colors from '../../constants/colors';

import BenefitTile from './BenefitTile';
import ListItemSeparator from '../Miscellaneous/ListItemSeparator';

//upo
function getPayload(dispatchType, item) {
  switch (dispatchType) {
    case ACTIONS.SET_BENEFIT_SCREEN: {
      return { screenState: 'benefit', benefit: item };
    }
  }
}

interface BenefitListProps {
  benefits: (Benefit | InventoryElem)[];
  //onPress?: (event: GestureResponderEvent) => void;
  customListStyle?: StyleProp<ViewStyle>;
  customBenefitTileStyle?: StyleProp<ViewStyle>;
  dispatch?: any;
  dispatchType?: string;
  mode: 'addToInventory' | 'addToRealization' | 'preview';
}

//giga upo
//todo: move setAmount to reducer hook
const BenefitList = ({
  benefits,
  //onPress,
  customListStyle,
  customBenefitTileStyle,
  dispatch,
  dispatchType,
  mode,
}: BenefitListProps) => {
  const listStyle = StyleSheet.flatten([styles.container, customListStyle]);

  const containerRight =
    mode === 'addToRealization' ? [styles.containerRight, {}] : styles.containerRight;
  //doesnt work properly, sets amount for all benefits in flatlist
  const [amount, setAmount] = useState(0);
  const benefitStyle = [
    StyleSheet.flatten([styles.benefit, customBenefitTileStyle]),
    mode === 'addToRealization' && amount === 0 && { backgroundColor: colors.swPaleGreen },
  ];
  const isPressable = mode === 'addToInventory';

  return (
    <View style={listStyle}>
      <FlatList
        data={benefits}
        keyExtractor={(benefit) => benefit.publicId}
        renderItem={({ item }) => (
          <BenefitTile
            name={item.name}
            onPress={
              isPressable
                ? () => dispatch({ type: dispatchType, payload: getPayload(dispatchType, item) })
                : () => {}
            }
            tileStyle={benefitStyle}
          >
            {/* error on item.price if {mode === 'addtoInventory' &&}   */}
            {'price' in item && (
              <View style={containerRight}>
                <View style={styles.containerInRow}>
                  <Text style={styles.text}>{item.price}</Text>
                  <Icon name='menu-right' size={35} />
                </View>
              </View>
            )}
            {'amount' in item && (
              <View style={[containerRight, { width: '30%' }]}>
                <View style={styles.containerInRow}>
                  <Icon
                    name='minus-circle-outline'
                    size={25}
                    onPress={() => {
                      if (amount > 0) setAmount((prev) => prev - 1);
                    }}
                  />
                  <Text style={{ fontSize: 25, padding: 10 }}>
                    {amount} / {item.amount}
                  </Text>
                  <Icon
                    name='plus-circle-outline'
                    size={25}
                    onPress={() => {
                      if (item.amount > amount) setAmount((prev) => prev + 1);
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
