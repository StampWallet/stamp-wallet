//WIP
export const INITIAL_STATE = {
  screenState: 'card',
  cardInfoState: 'business',
  benefit: null,
  benefitsToAdd: [],
  benefitsToRealize: [],
};

export const ACTIONS = {
  SET_SCREEN: 'setScreen',
  SET_INFO: 'setCardInfo',
  SET_BENEFIT: 'setBenefit',
  SET_BALANCE: 'setBalance',
  SET_BENEFITS_TO_REALIZE: 'setBenefitsToRealize',
  TRANSACTION_ADD_BENEFIT: 'addBenefit',
  TRANSACTION_SAVE: 'save',
  TRANSACTION_CANCEL: 'cancel',
  REPLACE_STATE: 'replaceState',
  ON_BACK_BENEFITS: 'backBenefits',
  SET_BENEFIT_SCREEN: 'setBenefitScreen',
  //CREATE_INVENTORY_MAP: 'createInventoryMap',
  REALIZATION_INCREMENT: 'incrementAmountOfBenefit',
  REALIZATION_SUB: 'substractAmountOfBenefit',
  REALIZE_BENEFITS: 'realizeBenefits',
  //REALIZATION_ADD: 'addBenefitToRealization',
  //REALIZATION_REMOVE: 'removeBenefitFromRealization',
};

//todo: map arrays
function findInArr(benefit, benefitArr) {
  return benefitArr.find((obj) => obj.publicId === benefit.publicId);
}

function addToArr(benefit, benefitArr) {
  let item = findInArr(benefit, benefitArr);
  item
    ? item.amount++
    : benefitArr.push({ publicId: benefit.publicId, amount: 1, name: benefit.name });
}

function completeTransaction(state, payload) {
  let inventory = state.inventory.slice();
  let cardContent = payload.content;
  state.benefitsToAdd.forEach((benefit) => {
    let obj = findInArr(benefit, inventory);
    obj ? (obj.amount += benefit.amount) : inventory.push(benefit);
  });
  //api request
  //temp solution
  cardContent.inventory = inventory;
  cardContent.points = state.balanceAfterTransaction;
  return inventory;
}

function addToTransaction(state) {
  const { benefit } = state;
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
    case ACTIONS.TRANSACTION_ADD_BENEFIT: {
      const [benefitsToAdd, balance] = addToTransaction(state);
      return {
        ...state,
        benefitsToAdd: benefitsToAdd,
        balanceAfterTransaction: balance,
      };
    }
    case ACTIONS.TRANSACTION_SAVE: {
      const inventory = completeTransaction(state, action.payload);
      return {
        ...state,
        inventory: inventory,
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
        benefitsToRealize: benefitsToRealize,
      };
    }
    case ACTIONS.REALIZATION_SUB: {
      const benefitsToRealize = subFromRealization(state, action.payload);
      return {
        ...state,
        benefitsToRealize: benefitsToRealize,
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
  }
}
