import React from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import colors from '../../constants/colors';
import CustomButton from '../Miscellaneous/CustomButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ACCOUNT_ROUTE, BUSINESS_ROUTE, HOME_ROUTE, MAIN_ROUTE } from '../../constants/paths';
import useOnPressHandlers from '../../hooks/useOnPressHandlers';

import * as api from '../../api';
import Auth from '../../database/Auth';

const SideBar = ({ translateXValue, mainScreenState }) => {
  const { mainScreenMode, businessCreated } = mainScreenState;
  const userFields = mainScreenMode === 'customer';

  const navigation = useNavigation();
  const { onPressBusiness } = useOnPressHandlers();

  const onPressNavigate = async (route, edit = false) => {
    switch (route) {
      case ACCOUNT_ROUTE:
        return navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ACCOUNT_ROUTE }],
          })
        );
      case BUSINESS_ROUTE:
        console.log(edit);
        return edit
          ? navigation.dispatch(
              CommonActions.navigate({ name: BUSINESS_ROUTE, params: { isEditing: true } })
            )
          : navigation.dispatch(CommonActions.navigate(BUSINESS_ROUTE));
      case 'LOGOUT': {
        const SA = new api.SessionsApi();
        const header = Auth.getAuthHeader();

        try {
          const response = await SA.logout(header);
          return navigation.dispatch(CommonActions.navigate(HOME_ROUTE));
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

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
        <CustomButton
          onPress={() => onPressNavigate(ACCOUNT_ROUTE)}
          title='account'
          customButtonStyle={styles.customButtonStyle}
          customTextStyle={styles.customTextStyle}
        />
        {!businessCreated && (
          <CustomButton
            onPress={() => onPressNavigate(BUSINESS_ROUTE)}
            title='create business'
            customButtonStyle={styles.customButtonStyle}
            customTextStyle={styles.customTextStyle}
          />
        )}
        {businessCreated && (
          <CustomButton
            onPress={() => onPressNavigate(BUSINESS_ROUTE, true)}
            title='my business'
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
        {userFields && businessCreated && (
          <CustomButton
            onPress={() => {}}
            title='my benefits'
            customButtonStyle={styles.customButtonStyle}
            customTextStyle={styles.customTextStyle}
          />
        )}
        <CustomButton
          onPress={() => onPressNavigate('LOGOUT')}
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
