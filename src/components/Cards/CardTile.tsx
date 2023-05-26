import React, { SetStateAction } from 'react';
import {
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

import Tile from '../Miscellaneous/Tile';
import colors from '../../constants/colors';

interface CardTileProps {
  image: ImageSourcePropType;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  tileStyle?: StyleProp<ViewStyle>;
  onLongCardPress?: () => SetStateAction<any>;
}

const CardTile = ({
  image,
  onPress,
  containerStyle,
  tileStyle,
  onLongCardPress,
}: CardTileProps) => (
  <Pressable onPress={onPress} style={containerStyle} onLongPress={onLongCardPress}>
    <Tile style={tileStyle}>
      <Image style={styles.image} source={image} resizeMode='contain' />
    </Tile>
  </Pressable>
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.swDarkBlue,
  },
  deleteIcon: {
    position: 'absolute',
    top: 25,
    right: -10,
    color: 'red',
  },
});

export default CardTile;
