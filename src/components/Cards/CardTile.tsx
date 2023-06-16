import React, { SetStateAction } from 'react';
import {
  StyleSheet,
  Image,
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

import Tile from '../Miscellaneous/Tile';
import colors from '../../constants/colors';
import { ImageSourcePropType } from 'react-native/types';
import Auth from '../../database/Auth';

interface CardTileProps {
  imageUrl: string;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  tileStyle?: StyleProp<ViewStyle>;
  onLongCardPress?: () => SetStateAction<any>;
  deletionMode?: boolean;
  isBenefit?: boolean;
}

const CardTile = ({
  imageUrl,
  onPress,
  containerStyle,
  tileStyle,
  onLongCardPress,
  deletionMode = false,
  isBenefit = false,
}: CardTileProps) => (
  <Pressable onPress={onPress} style={containerStyle} onLongPress={onLongCardPress}>
    <Tile style={tileStyle}>
      <Image
        style={[styles.image, deletionMode && { width: '80%' }]}
        source={
          isBenefit
            ? {
                uri: imageUrl,
                method: 'GET',
                headers: {
                  Authorization: 'Bearer ' + Auth.token,
                },
              }
            : { uri: imageUrl }
        }
        resizeMode='cover'
      />
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
