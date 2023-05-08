import React from 'react';
import { describe, expect } from '@jest/globals';
import { render, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import BenefitManipulationScreen from '../screens/BenefitManipulationScreen';

describe('Benefit manipulation tests', () => { 
    it('checks if rendered correctly', () => {
        const tree = render(<BenefitManipulationScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('checks content of the screen', () => {
        const tree = render(<BenefitManipulationScreen />);
        expect(tree.getAllByTestId('Text input')).toHaveLength(6);
        expect(tree.getAllByTestId('Text')).toHaveLength(1);
        expect(tree.getByTestId('dropFile')).toBeVisible;
        expect(tree.getByTestId('Button')).toBeVisible;

    })

    it('checks if error is shown', () => {
        let tree = render(<BenefitManipulationScreen />);
        fireEvent.changeText(tree.getByTestId('Text input'), "");
        fireEvent.press(tree.getByTestId('Button'));
        expect(tree.getByText('This field is required')).toBeVisible;
    })

    it('checks if Benefit is going to be saved', () => {
        const addBenefit = jest.fn();
        const date = new Date()
        const args = ['Name', 100, 'Description', date, (new Date()).setDate(date.getDate() + 1), 2];
        let tree = render(<BenefitManipulationScreen />);
        let textInputs = tree.getAllByTestId('Text input');
        for(let i = 0; i < textInputs.length; i++) { fireEvent.changeText(textInputs[i]), args[i] };
        fireEvent.press(tree.getByTestId('Button'));
        expect(addBenefit).toBeCalled;
    })
 })