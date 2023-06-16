import { itemDefinitions } from '../../../assets/mockData/itemDefinition';
import { startTransaction } from '../../../utils/transactions';

export const INITIAL_STATE = {
  screenState: 'card',
  cardInfoState: 'business',
  benefit: null,
  benefitsToAdd: [],
  benefitsToRealize: [],
  isModalOpen: false,
  onConfirmModal: () => {},
  barcode: '978020137962',
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
  SET_BARCODE: 'setBarcode',
};

export function ProcessInventory(ownedItems) {
  let inventory = [];
  ownedItems.forEach((obj) => {
    let item = findInArrDefinition(obj, inventory);
    item
      ? item.ids.push(obj.publicId)
      : (inventory = [...inventory, { definitionId: obj.definitionId, ids: [obj.publicId] }]);
  });
  let inventoryProper = [];
  inventory.forEach((obj) => {
    //get item definition
    let itemDefinition = obj.definitionId === '1' ? itemDefinitions[0] : itemDefinitions[1];
    inventoryProper.push({
      publicId: obj.definitionId,
      amount: obj.ids.length,
      name: itemDefinition.name,
      price: itemDefinition.price,
    });
  });
  return [inventory, inventoryProper];
}

function ProcessTransactionStart(state) {
  let claimedBenefits = [];
  state.benefitsToRealize.forEach((obj) => {
    let item = findInArrDefinitionPublicId(obj, state.inventoryIds);
    for (let i = 0; i < obj.amountToRealize; i++) {
      claimedBenefits.push(item.ids[i]);
    }
  });
  return claimedBenefits;
}

function findInArrDefinitionPublicId(benefit, benefitArr) {
  return benefitArr.find((obj) => obj.definitionId === benefit.publicId);
}

function findInArrDefinition(benefit, benefitArr) {
  return benefitArr.find((obj) => obj.definitionId === benefit.definitionId);
}

function findInArr(benefit, benefitArr) {
  return benefitArr.find((obj) => obj.publicId === benefit.publicId);
}

function addToArr(benefit, benefitArr, balance) {
  let item = findInArr(benefit, benefitArr);
  if (!item) {
    benefitArr.push({
      publicId: benefit.publicId,
      definitionId: benefit.definitionId,
      amount: 1,
      name: benefit.name,
      price: benefit.price,
      maxAmount: benefit.maxAmount,
    });
    return balance - benefit.price;
  }
  if (item.amount === benefit.maxAmount) {
    alert('Maximum number of this benefit reached!');
    return balance;
  } else {
    item.amount++;
    balance -= benefit.price;
    return balance;
  }
}

function completeTransaction(state, payload) {
  //todo: dodaj do drugiego typu inventory ktory trzyma [itemDefinitionId, [publicId]]
  //wykorzystaj to inventory do wyslania benefitow do realizacji w show card
  /*
  state.benefitsToAdd.forEach((obj) => {
    for(let i = 0; i < obj.amountToRealize; i++) {
      buyBenefit(payload.businessDetails.publicId, obj.definitionId);
    }
  })
  */
  let benefitsToAdd = state.benefitsToAdd.slice();
  let inventory = state.inventory;
  console.log(inventory);
  benefitsToAdd.forEach((benefit) => {
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
    //balance -= benefit.price;
    balance = addToArr(benefit, benefitsToAdd, balance);
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
    item.amount--;
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
    case ACTIONS.SET_BARCODE: {
      return {
        ...state,
        barcode: payload,
      };
    }
    case ACTIONS.CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false,
      };
    }
    case ACTIONS.OPEN_MODAL: {
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
      const [benefitsToAdd, balance] = addToTransaction(state, payload);
      return {
        ...state,
        benefitsToAdd: benefitsToAdd,
        balanceAfterTransaction: balance,
      };
    }
    case ACTIONS.TRANSACTION_CLEANUP: {
      const benefitsToAdd = cleanupTransaction(state);
      return {
        ...state,
        benefitsToAdd: benefitsToAdd,
      };
    }
    case ACTIONS.REALIZE_BENEFITS: {
      let claimedBenefits = ProcessTransactionStart(state);
      console.log(claimedBenefits);
      //const barcode = '978020137962';
      const barcode = startTransaction(payload[0], claimedBenefits, payload[1]);
      //start transaction businessId, claimedBenefits
      //get response, show barcode with given code
      return {
        ...state,
        barcode: barcode,
        screenState: 'barcode',
      };
    }
    case ACTIONS.TRANSACTION_SAVE: {
      let inventory = completeTransaction(state, action.payload);
      console.log(inventory);
      return {
        ...state,
        balance: state.balanceAfterTransaction,
        benefitsToAdd: [],
        inventory: inventory,
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

    case ACTIONS.SET_SUBMITTING: {
      return {
        ...state,
        isSubmitting: action.payload,
      };
    }
    case ACTIONS.SET_BENEFITS_TO_REALIZE: {
      console.log(state.inventory);
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
