import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { render } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import Database from '../database/database';
import nock from 'nock';
import mock = jest.mock;

describe('Database', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('makes a correct api request', async () => {
    const mockedData = [
      { witherMember: 'lavazza' },
      { witherMember: 'carlorossi' },
      { witherMember: 'intwoweeks' },
    ];

    const urlString = 'https://willBeSoonReplacedInTheFutureIPromise.uj.edu.pl';
    const endpoint = '/api/data';

    const scope = nock(urlString).get(endpoint).reply(200, mockedData);

    const response = await Database.makeServerRequest(`${urlString}/${endpoint}`);

    expect(response.data).toEqual(mockedData);
    expect(response.statusCode).toEqual(200);
    expect(scope.isDone()).toBe(true);
  });

  it('returns user data object', () => {
    const data = Database.getUserData();

    expect(data).toBeDefined();
  });

  it('checks log in status');
});
