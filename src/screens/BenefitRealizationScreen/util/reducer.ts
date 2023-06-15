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
      alert('Work in progress');
      //tbd
      return state;
    }
    case ACTIONS.REALIZATION_CANCEL: {
      alert('Work in progress');
      //tbd
      return state;
    }
    default:
      return state;
  }
}
