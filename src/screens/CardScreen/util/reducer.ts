export const INITIAL_STATE = {
  screenState: 'card',
  cardInfoState: 'business',
  benefit: null,
  benefitsToAdd: [],
};

export const ACTIONS = {
  SET_SCREEN: 'setScreen',
  SET_INFO: 'setCardInfo',
  SET_BENEFIT: 'setBenefit',
  SET_BALANCE: 'setBalance',
  TRANSACTION_ADD_BENEFIT: 'addBenefit',
  TRANSACTION_SAVE: 'save',
  TRANSACTION_CANCEL: 'cancel',
  REPLACE_STATE: 'replaceState',
  ON_BACK_BENEFITS: 'backBenefits',
  SET_BENEFIT_SCREEN: 'setBenefitScreen',
};

function completeTransaction(state, payload) {
  let inventory = state.inventory.slice();
  let cardContent = payload.content;
  state.benefitsToAdd.forEach((benefit) => {
    let obj = inventory.find((x) => x.id === benefit.id);
    obj ? (obj.amount += benefit.amount) : inventory.push(benefit);
  });
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
    let item = benefitsToAdd.find((x) => x.id === benefit.publicId);
    item
      ? item.amount++
      : benefitsToAdd.push({ id: benefit.publicId, amount: 1, name: benefit.name });
  }
  return [benefitsToAdd, balance];
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
  }
}
