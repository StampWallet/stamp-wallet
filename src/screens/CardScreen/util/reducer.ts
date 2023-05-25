export const INITIAL_STATE = {
  screenState: 'card',
  cardInfoState: 'business',
  benefit: null,
  //todo: proper values
  balance: 100,
  balanceAfterTransaction: 100,
  benefitsToAdd: [],
};

const actions = {
  SET_SCREEN: 'setScreen',
  SET_INFO: 'setCardInfo',
  SET_BENEFIT: 'setBenefit',
  SET_BALANCE: 'setBalance',
  REALIZATION_ADD_BENEFIT: 'addBenefit',
  REALIZATION_SAVE: 'save',
  REALIZATION_CANCEL: 'cancel',
};

export function handleSave(state, inventory) {
  state.benefitsToAdd.forEach((benefit) => {
    let obj = inventory.find((x) => x.id === benefit.id);
    obj ? (obj.amount += benefit.amount) : inventory.push(benefit);
  });
}

function handleAdd(state) {
  if (state.balanceAfterTransaction < state.benefit.price) {
    alert('insufficient funds');
    return;
  }
  let item = state.benefitsToAdd.find((x) => x.id === state.benefit.publicId);
  item ? item.amount++ : state.benefitsToAdd.push({ id: state.benefit.publicId, amount: 1 });
  state.balanceAfterTransaction -= state.benefit.price;
}

export function reducer(state, action) {
  const {
    SET_SCREEN,
    SET_INFO,
    SET_BENEFIT,
    SET_BALANCE,
    REALIZATION_ADD_BENEFIT,
    REALIZATION_SAVE,
    REALIZATION_CANCEL,
  } = actions;
  switch (action.type) {
    case SET_SCREEN: {
      return {
        ...state,
        screenState: action.screenState,
      };
    }
    case SET_INFO: {
      return {
        ...state,
        cardInfoState: action.cardInfoState,
      };
    }
    case SET_BENEFIT: {
      return {
        ...state,
        benefit: action.benefit,
      };
    }
    case SET_BALANCE: {
      return {
        ...state,
        balance: action.balance,
      };
    }
    case REALIZATION_ADD_BENEFIT: {
      handleAdd(state);
      return {
        ...state,
      };
    }
    case REALIZATION_SAVE: {
      return {
        ...state,
        balance: state.balanceAfterTransaction,
        benefitsToAdd: [],
      };
    }
    case REALIZATION_CANCEL: {
      return {
        ...state,
        balanceAfterTransaction: state.balance,
        benefitsToAdd: [],
      };
    }
  }
}
