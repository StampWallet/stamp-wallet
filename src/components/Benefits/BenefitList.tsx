import React, { useEffect, useState } from 'react';
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

function handleSubstraction(item) {
  if (item.toRealize > 0) item.toRealize--;
  console.log('clicked!');
}

function handleAddition(item) {
  if (item.amount > item.toRealize) item.toRealize++;
}

interface BenefitListProps {
  benefits: (Benefit | InventoryElem | any)[];
  //onPress?: (event: GestureResponderEvent) => void;
  customListStyle?: StyleProp<ViewStyle>;
  customBenefitTileStyle?: StyleProp<ViewStyle>;
  dispatch?: any;
  dispatchType?: string;
  mode: 'addToInventory' | 'addToRealization' | 'preview';
  state?: any; //temp
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
  state,
}: BenefitListProps) => {
  const listStyle = StyleSheet.flatten([styles.container, customListStyle]);

  const containerRight =
    mode === 'addToRealization' ? [styles.containerRight, {}] : styles.containerRight;
  const [benefitsList, setBenefitsList] = useState(benefits);
  //doesnt work properly, sets amount for all benefits in flatlist
  const [realize, onRealize] = useState<boolean>(false);
  const [benefitStyle, setBenefitStyle] = useState(
    StyleSheet.flatten([styles.benefit, customBenefitTileStyle])
  );

  function getBenefitStyle(item) {
    if (mode === 'addToRealization' && item.amountToRealize === 0)
      return [benefitStyle, { backgroundColor: colors.swPaleGreen }];
    return benefitStyle;
  }

  /*
  const benefitStyle = [
    StyleSheet.flatten([styles.benefit, customBenefitTileStyle]),
    mode === 'addToRealization' && amount === 0 && { backgroundColor: colors.swPaleGreen },
  ];
  */
  const isPressable = mode === 'addToInventory';

  //useEffect(() => {} [item.toRealize])

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
            tileStyle={getBenefitStyle(item)}
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
                      dispatch({ type: ACTIONS.REALIZATION_SUB, payload: item });
                      /*
                      if (item.toRealize > 0) {
                        item.toRealize--;
                        onRealize((prev) => !prev);
                      }
                      */
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
