import React from 'react';
import { Text, FlatList, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BenefitTile from './BenefitTile';
import ListItemSeparator from './ListItemSeparator';

const BenefitList = ({ benefits }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={benefits}
        keyExtractor={(benefit) => benefit.publicId}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => alert('Work in progress')}>
            <BenefitTile name={item.name} color={'#7BFF78'}>
              <View style={styles.containerRight}>
                <View style={styles.containerInRow}>
                  <Text style={styles.text}>{item.price}</Text>
                  <Icon name="menu-right" size={35} />
                </View>
              </View>
            </BenefitTile>
          </TouchableWithoutFeedback>
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
    padding: 20,
    paddingTop: 100,
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
