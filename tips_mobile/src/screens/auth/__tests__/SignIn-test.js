import React from 'react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import { render, fireEvent, cleanup } from '@testing-library/react-native';
import SignIn from '../SignIn';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {LOGIN_SAGA} from "../../../redux/actions/types";

jest.mock('@react-native-async-storage/async-storage', () => 'mockAsyncStorage');
jest.mock('../../../components/SearchDropDown', () => 'mocked SearchDropDown');
jest.mock('../../../components/UpdateSecureTextEntry', () => 'mocked UpdateSecureTextEntry');

afterEach(()=>jest.clearAllMocks());

describe('SignIn', () => {

    const mockStore = configureStore([]);
    const loginSaga = () => ({type: 'LOGIN_SAGA'});

    it('should dispatch action', () => {

        // Initialize mockstore with empty state
        const store = mockStore({});

        // Dispatch the action
        store.dispatch(loginSaga());

        // Test if your store dispatched the expected actions
        const actions = store.getActions();
        const expectedPayload = {type: 'LOGIN_SAGA'};
        expect(actions).toEqual([expectedPayload])
    });

    it('should display current SignIn', () => {
        const store = mockStore({systemReducer: {message: ''}});

        const state = store.getState();
        console.log(state);
        const rendered = render(
            <Provider store={store}><SignIn/></Provider>
        );
        const textComponent = rendered.getAllByText('Привет');

        expect(textComponent.length).toBe(1);
    });

    it('handle invalid inputs submission', () => {
        const store = mockStore({systemReducer:{message: ''}});

        const {getAllByText, getByText} = render(
            <Provider store={store}><SignIn/></Provider>
        );

        fireEvent.press(getByText('Войти'));

        const textComponent = getAllByText('поле должно быть заполнено');

        expect(textComponent.length).toBe(2);
    });

    it('handle invalid phone input submission', () => {
        const store = mockStore({systemReducer:{message: ''}});

        const {getAllByText, getByText, getByRole} = render(
            <Provider store={store}><SignIn/></Provider>
        );

        fireEvent.changeText(getByRole('input-phone'), 'invalid phone');
        fireEvent.press(getByText('Войти'));

        const textComponent = getAllByText('некорректный номер');

        expect(textComponent.length).toBe(1);
    });
});
