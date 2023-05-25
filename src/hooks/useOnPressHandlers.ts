import { REGISTER_ROUTE, LOGIN_ROUTE, CARD_INFO_ROUTE } from '../constants/paths';

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
    navigation.pop();
  };

  const onPressCardInfo = (navigation) => {
    navigation.push(CARD_INFO_ROUTE);
  };

  return { onPressLogIn, onPressRegister, onPressBack, onPressCardInfo };
};

export default useOnPressHandlers;
