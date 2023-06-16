import { itemDefinitions } from '../../../assets/mockData/itemDefinition';
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

function findInArrDefinitionId(benefit, benefitArr) {
  return benefitArr.find((obj) => obj.publicId === benefit.definitionId);
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

function findInArrDefinition(benefit, benefitArr) {
  return benefitArr.find((obj) => obj.definitionId === benefit.definitionId);
}

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
      amountToRealize: obj.ids.length,
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

export function ProcessBenefitsIn(benefits) {
  let benefitsToRealize = [];
  //get item definitions of business
  //let itemDefinitions;
  let ItemDefinitions = itemDefinitions;
  benefits.forEach((obj) => {
    let item = findInArrDefinitionId(obj, benefitsToRealize);
    if (item) {
      item.amount++;
      item.amountToRealize++;
    } else {
      let definition = findInArrDefinitionId(obj, ItemDefinitions);
      benefitsToRealize = [
        ...benefitsToRealize,
        { publicId: obj.publicId, amount: 1, amountToRealize: 1, name: definition.name },
      ];
    }
  });
  return benefitsToRealize;
}

function ProcessBenefitsOut(state, benefitsToRealize, addedPoints) {
  let processedBenefits = { addedPoints: addedPoints, itemActions: [] };
  let { itemActions } = processedBenefits;
  benefitsToRealize.forEach((obj) => {
    let i = 0;
    let item = findInArrDefinitionPublicId(obj, state.benefitsEnd);
    for (i = 0; i < obj.amount; i++) {
      itemActions = [...itemActions, { itemId: item.ids[i], action: 'REDEEMED' }];
    }

    //find in arr with ids
    for (i; i < item.ids.length; i++) {
      itemActions = [...itemActions, { itemId: item.ids[i], action: 'RECALLED' }];
    }
  });
  return itemActions;
}

function SubArrays(arr1, arr2) {
  let arrResult = arr1.slice();
  console.log(arr2);
  arr2.forEach((obj) => {
    let item = findInArr(obj, arrResult);
    console.log(obj.amount);
    item.amountToRealize -= obj.amountToRealize;
  });
  return arrResult;
}

export function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.SET_SCREEN: {
      console.log(state.benefitsToRealize);
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
      console.log('accept started');
      const benefitsToRealize = state.benefitsToRealize.slice();
      console.log(state.benefitsInt.length);
      let benefitsToRecall = SubArrays(state.benefitsInt, benefitsToRealize);
      let benefits = ProcessBenefitsOut(state.benefitsToRealize, benefitsToRealize, payload);
      //postTransaction(state.transactionCode, benefits);
      //tbd
      return { ...state };
    }
    case ACTIONS.REALIZATION_CANCEL: {
      let benefits = ProcessBenefitsOut([], state.benefitsInt, 0);
      //postTransaction(state.transactionCode, benefits);
      //tbd
      return state;
    }
    default:
      return state;
  }
}
