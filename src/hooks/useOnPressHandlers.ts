import { CommonActions, useNavigation } from '@react-navigation/native';

import {
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  CARD_INFO_ROUTE,
  CARD_ROUTE,
  HOME_ROUTE,
  MAIN_ROUTE,
  ADD_CARD_ROUTE,
} from '../constants/paths';
import MainScreen from '../screens/MainScreen';

const useOnPressHandlers = () => {
  const onPressLogIn = (navigation, data) => {
    // TODO sign in logic
    navigation.reset({
      index: 0,
      routes: [{ name: LOGIN_ROUTE }],
    });
  };

  const onPressRegister = (navigation, data) => {
    // TODO register logic
    const { email } = data;

    navigation.push(REGISTER_ROUTE, {
      email,
    });
  };

  const onPressBack = (navigation) => {
    console.log('aaa');
    navigation.pop();
  };

  const onPressBackHome = (navigation) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: MAIN_ROUTE }],
      })
    );
  };

  const onPressCardAddition = (navigation) => {
    navigation.push(ADD_CARD_ROUTE);
  };

  const onPressCard = (navigation, card) => {
    navigation.push(CARD_ROUTE, { Card: card });
  };

  const onPressCardInfo = (navigation) => {
    navigation.push(CARD_INFO_ROUTE);
  };

  return {
    onPressLogIn,
    onPressRegister,
    onPressBack,
    onPressCardInfo,
    onPressCard,
    onPressBackHome,
    onPressCardAddition,
  };
};

export default useOnPressHandlers;
