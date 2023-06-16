import React from 'react';
import * as api from '../api';
import Auth from '../database/Auth';
import { ACTIONS } from '../screens/CardScreen/util/reducer';

export const startTransaction = async (
  publicId: string,
  claimedBenefits: any[],
  dispatch?: any
) => {
  const TA = new api.TransactionApi();
  try {
    const header = Auth.getAuthHeader();
    const transactionResponse = await TA.startTransaction(
      publicId,
      { itemIds: claimedBenefits },
      header
    );
    console.log(transactionResponse.data.Code, ' ', transactionResponse.data.publicId);
    if (dispatch) {
      dispatch({ type: ACTIONS.SET_BARCODE, payload: transactionResponse.data.Code });
      dispatch({ type: ACTIONS.SET_SCREEN, payload: 'barcode' });
    }
    return transactionResponse.data.Code;
  } catch (e) {
    console.log('error:', e);
  }
};

export const fetchStartedTransaction = async (
  callbackFn: any, //temp
  transactionCode: string
) => {
  const TsA = new api.TransactionsApi();
  try {
    const header = Auth.getAuthHeader();
    const transactionResponse = await TsA.getTransactionDetails(transactionCode, header);
    callbackFn(transactionResponse);
  } catch (e) {
    console.log('error: ', e);
    callbackFn({});
  }
};

//idk
export const postTransaction = async (
  //callbackFn jako snackbar?
  //callbackFn: any, //temp
  transactionCode: string,
  transactionRequest: any
) => {
  const TsA = new api.TransactionsApi();
  try {
    const header = Auth.getAuthHeader();
    console.log(transactionRequest);
    const transactionResponse = await TsA.finishTransaction(
      transactionCode,
      transactionRequest,
      header
    );
    console.log(transactionResponse.data.message);
    return;
  } catch (e) {
    console.log('error: ', e);
    return;
  }
};

export const buyBenefit = async (businessId: string, itemDefinitionId: string) => {
  const VCA = new api.VirtualCardsApi();
  try {
    const header = Auth.getAuthHeader();
    const transactionResponse = await VCA.buyItem(businessId, itemDefinitionId, header);
    //console.log(transactionResponse.statusText);
    return transactionResponse.data.itemId;
  } catch (e) {
    console.log('error', e);
    console.log();
    return;
  }
};
