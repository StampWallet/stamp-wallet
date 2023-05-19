import React, { SetStateAction } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../Miscellaneous/CustomButton';

import colors from '../../../constants/colors';

export type OptionName = 'name' | 'addition' | 'usage' | 'card';
export type OptionType = 'desc' | 'asc' | 'virtual' | 'real';
export type OptionKey = {
  name: OptionName;
  type: OptionType;
};

export type Option = {
  key: OptionKey;
  label: string;
};

interface Props {
  setFilter: SetStateAction<any>;
  filter: OptionKey;
  name: string;
  leftOption: Option;
  rightOption: Option;
  icon?: boolean;
}

const matchesSelectedFilter = (filter, option) =>
  filter?.name === option.key.name && filter?.type === option.key.type;

export default function OptionRow({
  setFilter,
  filter,
  name,
  leftOption,
  rightOption,
  icon = false,
}: Props) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.swWhite,
        height: 50,
        width: '100%',
        paddingRight: 20,
      }}
    >
      <View>
        <Text style={{ paddingLeft: 24, fontSize: 20 }}>{name}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
        }}
      >
        <CustomButton
          onPress={() =>
            matchesSelectedFilter(filter, leftOption) ? setFilter(null) : setFilter(leftOption.key)
          }
          customButtonStyle={[
            styles.customButtonStyle,
            matchesSelectedFilter(filter, leftOption) && styles.chosenOption,
          ]}
        >
          {icon ? (
            <Icon
              name='arrow-up'
              size={24}
              style={matchesSelectedFilter(filter, leftOption) && { color: colors.swWhite }}
            />
          ) : (
            <Text
              style={[
                matchesSelectedFilter(filter, leftOption)
                  ? { color: colors.swWhite }
                  : { color: colors.swBlack },
                { fontSize: 16 },
              ]}
            >
              {leftOption.label}
            </Text>
          )}
        </CustomButton>
        <CustomButton
          onPress={() =>
            matchesSelectedFilter(filter, rightOption)
              ? setFilter(null)
              : setFilter(rightOption.key)
          }
          customButtonStyle={[
            styles.customButtonStyle,

            matchesSelectedFilter(filter, rightOption) && styles.chosenOption,
          ]}
        >
          {icon ? (
            <Icon
              name='arrow-down'
              size={24}
              style={matchesSelectedFilter(filter, rightOption) && { color: colors.swWhite }}
            />
          ) : (
            <Text
              style={
                matchesSelectedFilter(filter, rightOption)
                  ? { color: colors.swWhite }
                  : { color: colors.swBlack }
              }
            >
              {rightOption.label}
            </Text>
          )}
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  customButtonStyle: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.swWhite,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  chosenOption: {
    backgroundColor: colors.swLightBlue,
    borderWidth: 2,
    borderColor: colors.swDarkBlue,
  },
});
