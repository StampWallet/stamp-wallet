import { CommonActions, useNavigation } from '@react-navigation/native';

import {
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  CARD_INFO_ROUTE,
  CARD_ROUTE,
  HOME_ROUTE,
  MAIN_ROUTE,
  ADD_CARD_ROUTE,
  BUSINESS_ROUTE,
} from '../constants/paths';
import MainScreen from '../screens/MainScreen';
import { benefits } from '../assets/mockData/Benefits';
import { fetchVirtualCard } from '../utils/fetchCards';
import { fetchFile } from '../utils/files';

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

  const onPressBusiness = (navigation) => {
    navigation.push(BUSINESS_ROUTE);
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

  const onPressCard = async (navigation, card) => {
    //if virtualcard
    //if isAdded use getVirtualCard else getBusiness and use as card

    //then just add isAdded argument to object ig
    //temp solution on mockData below
    let Card;
    if ('businessDetails' in card && card.isAdded) {
      Card = await fetchVirtualCard(card.businessDetails.publicId);
    } else {
      Card = card;
    }
    /*
    if ('businessDetails' in card) {
      const imageUrl = await fetchFile(Card.businessDetails.bannerImageId);
      Card = { ...Card, imageUrl: imageUrl };
    }
    */

    navigation.push(CARD_ROUTE, { Card: Card });
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
    onPressBusiness,
  };
};

export default useOnPressHandlers;
