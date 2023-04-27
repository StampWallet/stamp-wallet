import React from 'react';
import {describe, expect, test} from '@jest/globals';
import { render } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import HomeScreen from '../screens/HomeScreen';

describe('Home screen tests', () => {
  it('checks if rendered correctly', () => {
    const tree = render(<HomeScreen />);
    expect(tree).toMatchSnapshot();

    expect(tree.getByText('Register')).toBeVisible();
    expect(tree.getByText('Login')).toBeVisible();
  });
});
