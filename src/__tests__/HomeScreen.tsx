import React from 'react';
import { describe, expect } from '@jest/globals';
import { render, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import HomeScreen from '../screens/HomeScreen';

describe('Home screen tests', () => {
  it('checks if rendered correctly', () => {
    const tree = render(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('checks if proper register form screen called', () => {
    const chooseFormScreen = jest.fn();
    const tree = render(<HomeScreen />)

    const registerButton = tree.getByText('Register');
    expect(registerButton).toBeVisible();
    fireEvent.press(registerButton);
    expect(chooseFormScreen).toBeCalledWith('REGISTER');

    const loginButton = tree.getByText('Sign in');
    expect(loginButton).toBeVisible();
    fireEvent.press(loginButton);
    expect(chooseFormScreen).toBeCalledWith('LOGIN');

  })
});
