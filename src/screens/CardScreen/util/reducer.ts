export const INITIAL_STATE = {
  screenState: 'card',
  cardInfoState: 'business',
  benefit: null,
  benefitsToAdd: [],
  benefitsToRealize: [],
  isModalOpen: false,
  onConfirmModal: () => {},
};

export const ACTIONS = {
  SET_SCREEN: 'setScreen',
  SET_INFO: 'setCardInfo',
  SET_BENEFIT: 'setBenefit',
  SET_BALANCE: 'setBalance',
  SET_BENEFITS_TO_REALIZE: 'setBenefitsToRealize',
  TRANSACTION_ADD_BENEFIT: 'addBenefit',
  TRANSACTION_RM_BENEFIT: 'removeBenefit',
  TRANSACTION_CLEANUP: 'cleanup',
  TRANSACTION_SAVE: 'save',
  TRANSACTION_CANCEL: 'cancel',
  REPLACE_STATE: 'replaceState',
  ON_BACK_BENEFITS: 'backBenefits',
  SET_BENEFIT_SCREEN: 'setBenefitScreen',
  REALIZATION_INCREMENT: 'incrementAmountOfBenefit',
  REALIZATION_SUB: 'substractAmountOfBenefit',
  REALIZE_BENEFITS: 'realizeBenefits',
  //REALIZATION_ADD: 'addBenefitToRealization',
  //REALIZATION_REMOVE: 'removeBenefitFromRealization',
  SET_SUBMITTING: 'setSubmit',
  OPEN_MODAL: 'checkIfTransactionPending',
  CLOSE_MODAL: 'closeModal',
};

function findInArr(benefit, benefitArr) {
  return benefitArr.find((obj) => obj.publicId === benefit.publicId);
}

function addToArr(benefit, benefitArr) {
  let item = findInArr(benefit, benefitArr);
  item
    ? item.amount++
    : benefitArr.push({
        publicId: benefit.publicId,
        amount: 1,
        name: benefit.name,
        price: benefit.price,
      });
}

function completeTransaction(state, payload) {
  let inventory = state.inventory.slice();
  state.benefitsToAdd.forEach((benefit) => {
    let obj = findInArr(benefit, inventory);
    obj ? (obj.amount += benefit.amount) : inventory.push(benefit);
  });
  //api request
  //temp solution
  payload.inventory = inventory;
  payload.points = state.balanceAfterTransaction;
  return inventory;
}

function addToTransaction(state, payload) {
  const benefit = payload;
  let benefitsToAdd = state.benefitsToAdd.slice();
  let balance = state.balanceAfterTransaction;
  if (balance < benefit.price) {
    alert('insufficient funds');
  } else {
    balance -= benefit.price;
    addToArr(benefit, benefitsToAdd);
  }
  return [benefitsToAdd, balance];
}

function rmFromTransaction(state, payload) {
  const benefit = payload;
  let benefitsToAdd = state.benefitsToAdd.slice();
  let balance = state.balanceAfterTransaction;
  let item = findInArr(benefit, benefitsToAdd);
  if (item.amount > 0) {
    balance += benefit.price;
    /*
  if (item.amount === 1) {
    console.log('1');
    benefitsToAdd = benefitsToAdd.filter((item) => item.publicId !== benefit.publicId);
  } else*/ item.amount--;
  }
  return [benefitsToAdd, balance];
}

function cleanupTransaction(state) {
  let benefitsToAdd = state.benefitsToAdd.slice();
  benefitsToAdd = benefitsToAdd.filter((obj) => obj.amount > 0);
  return benefitsToAdd;
}

function addToRealization(state, benefit) {
  let benefitToRealize = state.benefitsToRealize.slice();
  let item = findInArr(benefit, benefitToRealize);
  if (item.amountToRealize < item.amount) item.amountToRealize++;
  return benefitToRealize;
}

function subFromRealization(state, benefit) {
  let benefitToRealize = state.benefitsToRealize.slice();
  let item = findInArr(benefit, benefitToRealize);
  if (item.amountToRealize > 0) item.amountToRealize--;
  return benefitToRealize;
}

export function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.CLOSE_MODAL: {
      console.log('Modal should disappear');
      return {
        ...state,
        isModalOpen: false,
      };
    }
    case ACTIONS.OPEN_MODAL: {
      console.log('Modal should open');
      return {
        ...state,
        isModalOpen: true,
        onConfirmModal: payload,
      };
    }
    case ACTIONS.SET_SCREEN: {
      return {
        ...state,
        screenState: payload,
      };
    }
    case ACTIONS.SET_INFO: {
      return {
        ...state,
        cardInfoState: payload,
      };
    }
    case ACTIONS.SET_BENEFIT: {
      return {
        ...state,
        benefit: payload,
      };
    }
    case ACTIONS.SET_BALANCE: {
      return {
        ...state,
        balance: payload,
      };
    }
    case ACTIONS.TRANSACTION_RM_BENEFIT: {
      const [benefitsToAdd, balance] = rmFromTransaction(state, payload);
      return {
        ...state,
        benefitsToAdd,
        balanceAfterTransaction: balance,
      };
    }
    case ACTIONS.TRANSACTION_ADD_BENEFIT: {
      console.log(payload);
      const [benefitsToAdd, balance] = addToTransaction(state, payload);
      return {
        ...state,
        benefitsToAdd: benefitsToAdd,
        balanceAfterTransaction: balance,
      };
    }
    case ACTIONS.TRANSACTION_CLEANUP: {
      const benefitsToAdd = cleanupTransaction(state);
      console.log(benefitsToAdd);
      return {
        ...state,
        benefitsToAdd: benefitsToAdd,
      };
    }
    case ACTIONS.TRANSACTION_SAVE: {
      const inventory = completeTransaction(state, action.payload);
      return {
        ...state,
        inventory,
        balance: state.balanceAfterTransaction,
        benefitsToAdd: [],
      };
    }
    case ACTIONS.TRANSACTION_CANCEL: {
      return {
        ...state,
        balanceAfterTransaction: state.balance,
        benefitsToAdd: [],
      };
    }
    case ACTIONS.REPLACE_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTIONS.ON_BACK_BENEFITS: {
      return {
        ...state,
        screenState: payload.screenState,
        cardInfoState: payload.cardInfoState,
      };
    }
    case ACTIONS.SET_BENEFIT_SCREEN: {
      return {
        ...state,
        screenState: payload.screenState,
        benefit: payload.benefit,
      };
    }
    case ACTIONS.REALIZATION_INCREMENT: {
      const benefitsToRealize = addToRealization(state, action.payload);
      return {
        ...state,
        benefitsToRealize,
      };
    }
    case ACTIONS.REALIZATION_SUB: {
      const benefitsToRealize = subFromRealization(state, action.payload);
      return {
        ...state,
        benefitsToRealize,
      };
    }

    case ACTIONS.SET_SUBMITTING: {
      return {
        ...state,
        isSubmitting: action.payload,
      };
    }
    case ACTIONS.SET_BENEFITS_TO_REALIZE: {
      return {
        ...state,
        benefitsToRealize: payload.map((obj) => ({ ...obj, amountToRealize: 0 })),
      };
    }
    case ACTIONS.REALIZE_BENEFITS: {
      //backend
      return {
        ...state,
        benefitsToRealize: [],
      };
    }

    default: {
      return state;
    }
  }
}
