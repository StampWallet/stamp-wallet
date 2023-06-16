import React, { SetStateAction } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useOnPressHandlers from '../../hooks/useOnPressHandlers';
import ListItemSeparator from '../Miscellaneous/ListItemSeparator';
import StyleBase from '../../styles/StyleBase';
import Icon from 'react-native-vector-icons/AntDesign';
import CardTile from '../Cards/CardTile';
import { BASE_PATH } from '../../api/base';

interface Props {
  // todo change the type
  benefits: any[];
  onLongBenefitPress?: () => SetStateAction<any>;
  onPress?: (benefit) => void;
  deletionMode?: boolean;
}

export default function MainScreenBenefitList({
  benefits,
  onLongBenefitPress,
  deletionMode = false,
  onPress,
}: Props) {
  const navigation = useNavigation();
  const { onPressBenefit } = useOnPressHandlers();

  return (
    <View style={[StyleBase.container, { paddingTop: 10 }]}>
      <FlatList
        data={benefits}
        renderItem={({ item }) => (
          <View>
            <CardTile
              imageUrl={`${BASE_PATH}/file/${item.imageId}`}
              onLongCardPress={onLongBenefitPress}
              onPress={deletionMode ? () => onPress(item) : () => onPressBenefit(navigation, item)}
              deletionMode={deletionMode}
              isBenefit
            />
            {deletionMode && (
              <Icon
                name='delete'
                style={styles.deleteIcon}
                size={40}
                onPress={() => onPress(item)}
              />
            )}
          </View>
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
    color: 'red',
  },
});
