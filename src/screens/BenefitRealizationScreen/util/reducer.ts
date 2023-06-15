import { postTransaction } from '../../../utils/transactions';

export const INITIAL_STATE = {
  screenState: 'transaction',
  benefitsToRealize: [],
};

export const ACTIONS = {
  DEFAULT: 'default',
  REALIZATION_INT: 'realizationInitiate',
  REALIZATION_SAVE_REFUND: 'realizationSaveRefund',
  REALIZATION_INCREMENT: 'incrementAmountOfBenefit',
  REALIZATION_SUB: 'substractAmountOfBenefit',
  REALIZATION_CANCEL_REFUND: 'realizationCancelRefund',
  REALIZATION_ACCEPT: 'realizationAccept',
  REALIZATION_CANCEL: 'realizationCancel',
  SET_SCREEN: 'setScreen',
};

function findInArr(benefit, benefitArr) {
  return benefitArr.find((obj) => obj.publicId === benefit.publicId);
}

function addToRealization(state, benefit) {
  let benefitsToRealize = state.benefitsToRealize.slice();
  let item = findInArr(benefit, benefitsToRealize);
  if (item.amountToRealize < item.amount) item.amountToRealize++;
  return benefitsToRealize;
}

function subFromRealization(state, benefit) {
  let benefitsToRealize = state.benefitsToRealize.slice();
  let item = findInArr(benefit, benefitsToRealize);
  if (item.amountToRealize > 0) item.amountToRealize--;
  return benefitsToRealize;
}

function SubArrays(arr1, arr2) {
  let arrResult = arr1.slice();
  arr2.forEach((obj) => {
    let item = findInArr(obj, arrResult);
    item.amount -= obj.amount;
  });
  return arrResult;
}

export function ProcessBenefitsIn(benefits) {
  let benefitsToRealize = [];
  benefits.forEach((obj) => {
    let item = findInArr(obj, benefitsToRealize);
    item
      ? (item.amount++, item.amountToRealize++)
      : (benefitsToRealize = [
          ...benefitsToRealize,
          { publicId: item.publicId, amount: 1, amountToRealize: 1 },
        ]);
  });
  return benefitsToRealize;
}

function ProcessBenefitsOut(benefitsToRealize, benefitsToRecall, addedPoints) {
  let processedBenefits = { addedPoints: addedPoints, itemActions: [] };
  let { itemActions } = processedBenefits;
  benefitsToRealize.forEach((obj) => {
    for (let i = 0; i < obj.amount; i++) {
      itemActions = [...itemActions, { itemId: obj.publicId, action: 'REDEEMED' }];
    }
  });
  benefitsToRecall.forEach((obj) => {
    for (let i = 0; i < obj.amount; i++) {
      itemActions = [...itemActions, { itemId: obj.publicId, action: 'RECALLED' }];
    }
  });
  return itemActions;
}

export function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.SET_SCREEN: {
      return {
        ...state,
        screenState: payload,
      };
    }
    case ACTIONS.REALIZATION_SAVE_REFUND: {
      let benefitsToRealize = state.benefitsToRealize;
      benefitsToRealize = benefitsToRealize.filter((obj) => obj.amountToRealize != 0);
      benefitsToRealize = benefitsToRealize.map((obj) => ({ ...obj, amount: obj.amountToRealize }));
      return {
        ...state,
        benefitsToRealize: benefitsToRealize,
      };
    }
    case ACTIONS.REALIZATION_CANCEL_REFUND: {
      const benefitsToRealize = state.benefitsToRealize.map((obj) => ({
        ...obj,
        amountToRealize: obj.amount,
      }));
      return {
        ...state,
        benefitsToRealize: benefitsToRealize,
      };
    }
    case ACTIONS.REALIZATION_INCREMENT: {
      const benefitsToRealize = addToRealization(state, payload);
      return {
        ...state,
        benefitsToRealize: benefitsToRealize,
      };
    }
    case ACTIONS.REALIZATION_SUB: {
      const benefitsToRealize = subFromRealization(state, payload);
      return {
        ...state,
        benefitsToRealize: benefitsToRealize,
      };
    }
    case ACTIONS.REALIZATION_ACCEPT: {
      console.log('dupa1');
      let benefitsToRecall = SubArrays(state.benefitsInt, state.benefitsToRealize);
      console.log(benefitsToRecall);
      let benefits = ProcessBenefitsOut(state.benefitsToRealize, benefitsToRecall, payload);
      console.log(benefits);
      //postTransaction(state.transactionCode, benefits);
      //tbd
      return state;
    }
    case ACTIONS.REALIZATION_CANCEL: {
      let benefits = ProcessBenefitsOut([], state.benefitsInt, 0);
      console.log(benefits);
      //postTransaction(state.transactionCode, benefits);
      //tbd
      return state;
    }
    default:
      return state;
  }
}
