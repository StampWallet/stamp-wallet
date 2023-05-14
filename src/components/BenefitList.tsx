import React from 'react';
import { Text, FlatList, Pressable, StyleSheet, View, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BenefitTile from './BenefitTile';
import ListItemSeparator from './ListItemSeparator';

interface BenefitListProps {
  benefits: object;
  onPress: (event: GestureResponderEvent) => void;
}

const BenefitList = ({ benefits, onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={benefits}
        keyExtractor={(benefit) => benefit.publicId}
        renderItem={({ item }) => (
          <BenefitTile name={item.name} color={'#7BFF78'} onPress={onPress}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    marginRight: '5%',
    marginLeft: '5%',
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
