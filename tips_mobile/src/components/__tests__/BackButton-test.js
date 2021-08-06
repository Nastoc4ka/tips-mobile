import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BackButton from '../BackButton';

const onPressMock = jest.fn();

jest.mock('../BackArrowBlackIconWrapped', () => 'mocked');

describe('test BackButton component', () => {
    test('component render properly', () => {
        const {getByRole} = render(<BackButton onPress={onPressMock} />);
        fireEvent.press(getByRole('button'));
        expect(onPressMock).toHaveBeenCalled();
    })
});