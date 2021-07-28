import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from '../ErrorMessage';
import {Platform} from 'react-native';

describe('Tests ErrorMessage', () => {
    describe("IOS", () => {

        beforeAll(() => {
            Platform.OS = 'ios';
        });

        test('component render properly' ,() => {
            const actual = renderer.create(<ErrorMessage message={'some small error'}/>);

            expect(actual.toJSON()).toMatchSnapshot();
        });
    });

    describe("Android", () => {

        beforeAll(() => {
            Platform.OS = 'android';
        });

        test('component render properly' ,() => {
            const actual = renderer.create(<ErrorMessage message={'some small error'}/>);

            expect(actual.toJSON()).toMatchSnapshot();
        });
    });
});
