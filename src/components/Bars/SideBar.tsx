import React from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import colors from '../../constants/colors';
import CustomButton from '../Miscellaneous/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { BUSINESS_ROUTE } from '../../constants/paths';
import useOnPressHandlers from '../../hooks/useOnPressHandlers';

const SideBar = ({ translateXValue, mainScreenState }) => {
  const { mainScreenMode, businessCreated } = mainScreenState;
  const userFields = mainScreenMode === 'customer';

  const navigation = useNavigation();
  const { onPressBusiness } = useOnPressHandlers();

  return (
    <Animated.View
      style={{
        flexGrow: 1,
        backgroundColor: colors.swLightBlue,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: -200,
        right: 0,
        zIndex: 1,
        width: 200,
        transform: [
          {
            translateX: translateXValue,
          },
        ],
      }}
    >
      <View style={styles.buttonContainer}>
        {/*<Text>Dupa</Text>*/}
        <CustomButton
          onPress={() => {}}
          title='account'
          customButtonStyle={styles.customButtonStyle}
          customTextStyle={styles.customTextStyle}
        />
        {!businessCreated && (
          <CustomButton
            onPress={() => onPressBusiness(navigation)}
            title='create business'
            customButtonStyle={styles.customButtonStyle}
            customTextStyle={styles.customTextStyle}
          />
        )}
        {businessCreated && (
          <CustomButton
            onPress={() => {}}
            title='my business'
            customButtonStyle={styles.customButtonStyle}
            customTextStyle={styles.customTextStyle}
          />
        )}
        {businessCreated && (
          <CustomButton
            onPress={() => {}}
            title='edit business'
            customButtonStyle={styles.customButtonStyle}
            customTextStyle={styles.customTextStyle}
          />
        )}
        {!userFields && (
          <CustomButton
            onPress={() => {}}
            title='my cards'
            customButtonStyle={styles.customButtonStyle}
            customTextStyle={styles.customTextStyle}
          />
        )}
        {userFields && (
          <CustomButton
            onPress={() => {}}
            title='my benefits'
            customButtonStyle={styles.customButtonStyle}
            customTextStyle={styles.customTextStyle}
          />
        )}
        <CustomButton
          onPress={() => {}}
          title='logout'
          customButtonStyle={styles.customButtonStyle}
          customTextStyle={styles.customTextStyle}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: 70,
  },
  customButtonStyle: {
    marginBottom: 0,
    backgroundColor: colors.swLightBlue,
  },
  customTextStyle: {
    fontSize: 18,
  },
});

export default SideBar;
