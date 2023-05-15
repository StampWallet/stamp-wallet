import React from 'react';
import {
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Benefit } from '../../types';

import colors from '../../constants/colors';

import BenefitTile from './BenefitTile';
import ListItemSeparator from '../Miscellaneous/ListItemSeparator';

interface BenefitListProps {
  benefits: ArrayLike<any>; //temp
  //benefits: ArrayLike<Benefit>;
  onPress: (event: GestureResponderEvent) => void;
  customListStyle?: StyleProp<ViewStyle>;
  customBenefitTileStyle?: StyleProp<ViewStyle>;
}

const BenefitList = ({
  benefits,
  onPress,
  customListStyle,
  customBenefitTileStyle,
}: BenefitListProps) => {
  const listStyle = StyleSheet.flatten([styles.container, customListStyle]);
  const benefitStyle = StyleSheet.flatten([styles.benefit, customBenefitTileStyle]);

  return (
    <View style={listStyle}>
      <FlatList
        data={benefits}
        keyExtractor={(benefit) => benefit.publicId}
        renderItem={({ item }) => (
          <BenefitTile
            name={item.name}
            color={'#7BFF78'}
            onPress={onPress}
            tileStyle={benefitStyle}
          >
            <View style={styles.containerRight}>
              <View style={styles.containerInRow}>
                <Text style={styles.text}>{item.price}</Text>
                <Icon name='menu-right' size={35} />
              </View>
            </View>
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
    alignSelf: 'flex-end',
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
