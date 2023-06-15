import React, { useEffect, useReducer } from 'react';
import { SafeAreaView, StatusBar, Text, View, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import StyleBase from '../../styles/StyleBase';
import colors from '../../constants/colors';
import TopBar from '../../components/Bars/TopBar';
import { BUSINESS_ROUTE, MAIN_ROUTE } from '../../constants/paths';

import { reducer, INITIAL_STATE, ACTIONS, ProcessBenefitsIn } from './util/reducer';
import BenefitList from '../../components/Benefits/BenefitList';
import BoxContainer from '../../components/Miscellaneous/BoxContainer';
import HookFormInput from '../../components/HookFormComponents/HookFormInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/Miscellaneous/CustomButton';
import { benefits } from '../../assets/mockData/BenefitsApi';

/* 
    todo: 
    get benefits, user data

*/

function Navigate(navigation, screenState, dispatch) {
  if (screenState === 'transaction') {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: MAIN_ROUTE }],
      })
    );
  }

  if (screenState == 'refund') {
    dispatch({ type: ACTIONS.REALIZATION_CANCEL_REFUND });
    dispatch({ type: ACTIONS.SET_SCREEN, payload: 'transaction' });
  }
}

//temp
interface Props {
  navigation: any;
  route: any;
}

const mockUserData = {
  name: 'Stachu',
};

const mockBenefitsData = [
  {
    publicId: 1,
    amount: 5,
    name: 'test1',
    price: 100,
  },
  {
    publicId: 2,
    amount: 3,
    name: 'test2',
    price: 200,
  },
  {
    publicId: 3,
    amount: 2,
    name: 'test3',
    price: 300,
  },
  {
    publicId: 4,
    amount: 1,
    name: 'test4',
    price: 400,
  },
];

export default function BenefitRealizationScreen({ navigation, route }: Props) {
  //const benefits = route.props;
  const Benefits = benefits;
  let benefitsProcessed = ProcessBenefitsIn(Benefits);
  console.log(benefitsProcessed);
  const { control } = useForm();
  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    //screenState: 'transaction',
    //benefitsInt: benefitsProcessed,
    //benefitsToRealize: benefitsProcessed,
    benefitsInt: mockBenefitsData.map((obj) => ({ ...obj, amountToRealize: obj.amount })),
    benefitsToRealize: mockBenefitsData.map((obj) => ({ ...obj, amountToRealize: obj.amount })),
  });

  return (
    <SafeAreaView style={[StyleBase.container, { justifyContent: 'flex-end' }]}>
      <StatusBar barStyle='default' />
      <TopBar
        iconLeft='arrow-left'
        onPressLeft={() => Navigate(navigation, state.screenState, dispatch)}
      />
      <BoxContainer
        style={{
          backgroundColor: colors.swViolet,
          marginBottom: 20,
          width: '85%',
          borderRadius: 10,
          height: '20%',
        }}
      >
        <Text style={styles.text}>{mockUserData.name}</Text>
      </BoxContainer>
      <Text style={styles.headline}>Claimed Benefits</Text>
      {state.screenState === 'transaction' && (
        <>
          <View style={{ height: '28%' }}>
            <BenefitList benefits={state.benefitsToRealize} mode='realizationInfo' />
          </View>
          <View style={{ width: '80%' }}>
            <HookFormInput
              name='points'
              header='enter amount of points earned by client'
              control={control}
            />
          </View>
          <CustomButton
            onPress={() => dispatch({ type: ACTIONS.REALIZATION_ACCEPT })}
            title='accept transaction'
          />
          <CustomButton
            onPress={() => dispatch({ type: ACTIONS.SET_SCREEN, payload: 'refund' })}
            title='choose benefits to refund'
            customButtonStyle={styles.whiteButton}
            customTextStyle={styles.blackText}
          />
          <CustomButton
            onPress={() => dispatch({ type: ACTIONS.REALIZATION_CANCEL })}
            title='cancel transaction'
            customButtonStyle={styles.whiteButton}
            customTextStyle={styles.blackText}
          />
        </>
      )}
      {state.screenState === 'refund' && (
        <>
          <View style={{ height: '28%' }}>
            <BenefitList
              benefits={state.benefitsToRealize}
              mode='addToRealization'
              dispatch={dispatch}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={() => {
                dispatch({ type: ACTIONS.REALIZATION_SAVE_REFUND });
                dispatch({ type: ACTIONS.SET_SCREEN, payload: 'transaction' });
              }}
              title='save benefits'
            />
            <CustomButton
              onPress={() => {
                dispatch({ type: ACTIONS.REALIZATION_CANCEL_REFUND });
                dispatch({ type: ACTIONS.SET_SCREEN, payload: 'transaction' });
              }}
              title='cancel'
              customButtonStyle={styles.whiteButton}
              customTextStyle={styles.blackText}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '34%',
  },
  headline: {
    fontSize: 25,
    paddingBottom: 15,
    textDecorationLine: 'underline',
  },
  whiteButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.swBlack,
  },
  text: {
    fontSize: 24,
    padding: 10,
  },
  blackText: {
    color: colors.swBlack,
  },
});
