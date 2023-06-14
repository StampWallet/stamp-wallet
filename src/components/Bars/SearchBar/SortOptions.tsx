import React, { SetStateAction, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../../constants/colors';
import OptionRow, { OptionKey } from './OptionRow';
import CustomButton from '../../Miscellaneous/CustomButton';

import filterOptions from './filterOptions';

interface Props {
  setFilter: SetStateAction<any>;

  filter: OptionKey;
  setFilterDropdownVisibility: SetStateAction<any>;
}

const SortOptions = ({ setFilter, filter, setFilterDropdownVisibility }: Props) => {
  const [currentFilter, setCurrentFilter] = useState<OptionKey | null>(filter);

  return (
    <View style={styles.container}>
      <OptionRow
        setFilter={setCurrentFilter}
        filter={currentFilter}
        name='by name'
        leftOption={filterOptions[0]}
        rightOption={filterOptions[1]}
      />
      <OptionRow
        setFilter={setCurrentFilter}
        filter={currentFilter}
        name='by addition date'
        leftOption={filterOptions[2]}
        rightOption={filterOptions[3]}
        icon
      />
      <OptionRow
        setFilter={setCurrentFilter}
        filter={currentFilter}
        name='by last usage date'
        leftOption={filterOptions[4]}
        rightOption={filterOptions[5]}
        icon
      />
      <OptionRow
        setFilter={setCurrentFilter}
        filter={currentFilter}
        name='by card type'
        leftOption={filterOptions[6]}
        rightOption={filterOptions[7]}
      />
      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={() => {
            setFilter(currentFilter);
            setFilterDropdownVisibility(false);
          }}
          customButtonStyle={styles.customButtonStyle}
          customTextStyle={styles.customButtonTextStyle}
          title='set filter'
        />
        <CustomButton
          onPress={() => {
            setFilterDropdownVisibility(false);
          }}
          customButtonStyle={styles.customButtonStyle}
          customTextStyle={styles.customButtonTextStyle}
          title='cancel'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 60,
    height: 280,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: colors.swBlack,
    backgroundColor: colors.swWhite,
    zIndex: 999,
  },
  buttonWrapper: {
    backgroundColor: colors.swWhite,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  customButtonStyle: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.swLightBlue,
  },
  customButtonTextStyle: {
    fontSize: 16,
    color: colors.swWhite,
    fontWeight: 'normal',
  },
});

export default SortOptions;
