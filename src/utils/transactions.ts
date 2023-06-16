import React from 'react';
import * as api from '../api';
import Auth from '../database/Auth';

export const startTransaction = async (publicId: string, claimedBenefits: any[]) => {
  const TA = new api.TransactionApi();
  try {
    const header = Auth.getAuthHeader();
    const transactionResponse = await TA.startTransaction(
      publicId,
      { itemIds: claimedBenefits },
      header
    );
    console.log(transactionResponse.data.Code, ' ', transactionResponse.data.publicId);
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
