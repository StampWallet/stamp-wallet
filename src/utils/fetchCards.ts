import React from 'react';
import * as api from '../api';
import Auth from '../database/Auth';

export const fetchLocalCards = async (callbackFn: React.Dispatch<React.SetStateAction<any[]>>) => {
  const LCA = new api.LocalCardsApi();

  try {
    const header = Auth.getAuthHeader();
    const localCardsResponse = await LCA.getLocalCardTypes(header);
    callbackFn([...localCardsResponse.data.types]);
  } catch (e) {
    console.log('error:', e);
    callbackFn([]);
  }
};

export const fetchVirtualCards = async (
  query: string,
  callbackFn: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const UA = new api.UserApi();

  try {
    const header = Auth.getAuthHeader();
    const virtualCardsResponse = await UA.searchBusinesses(query, null, null, header);
    callbackFn([...virtualCardsResponse.data.businesses]);
  } catch (e) {
    console.log('error:', e);
    callbackFn([]);
  }
};
