import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { render } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import App from '../../App';

describe('App', () => {
  it('checks if sets current screen correctly', () => {
    const tree = render(<App />);

    const setCurrentScreen = jest.fn();

    setCurrentScreen('Home screen');

    const home = tree.getByText('Home screen');
    expect(home).toBeDefined();
  });
});
