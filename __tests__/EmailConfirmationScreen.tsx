import React from 'react';
import { describe, expect } from '@jest/globals';
import { render, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import EmailConfirmationScreen from '../screens/EmailConfirmationScreen';

describe('Email confirmation screen tests', () => {
    it('checks if rendered correctly', () => {
        const tree = render(<EmailConfirmationScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('checks if log out works correctly', () => {
        const onLogOut = jest.fn();
        const tree = render(<EmailConfirmationScreen />);
        const logoutButton = tree.getByText('Log out');
        expect(logoutButton).toBeVisible;
        fireEvent.press(logoutButton);
        expect(onLogOut).toBeCalled;
    })

    it('checks if change email works correctly', () => {
        const onChangeEmail = jest.fn();
        const tree = render(<EmailConfirmationScreen />);
        const changeMailButton = tree.getByText('Change email');
        expect(changeMailButton).toBeVisible;
        fireEvent.press(changeMailButton);
        expect(onChangeEmail).toBeCalled;
    })
})