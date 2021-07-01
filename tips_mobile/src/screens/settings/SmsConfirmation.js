import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {BackgroundSettings, CustomButton, Input, AuthModal} from "../../components";
import {useSelector, useDispatch} from "react-redux";
import {Portal} from 'react-native-portalize';
import {clearMessage, hideBlur, setConfirmCurrentPasswordSaga, currentPasswordSetFalse} from '../../redux/actions';
import {styleSettingsButton, styleSettingsInput, styleSettingsScreen, styleSettingsButtonBlue, styleSettingsButtonString} from "../../styles";
import {SMS_CONFIRMATION, CHANGE_PASSWORD} from "../../constants/routeNames";

const EMPTY_INPUT_ERROR = 'поле должно быть заполнено';

const passwordConfirmation = ({navigation}) => {
    const dispatch = useDispatch();
    const {message, confirmPassword} = useSelector(state => state.systemReducer);

    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');

    const validate = (value) => value.trim() ? '' : EMPTY_INPUT_ERROR;

    const onChange = (value) => {
        setCurrentPassword(value);
        setCurrentPasswordError('');
    };

    const handleCloseModal = () => {
        dispatch(clearMessage());
        dispatch(hideBlur());
    };

    const displayInputError = (validatorFunc) => (data) => {
        setCurrentPasswordError(validatorFunc(data));
    };

    const onCheckCurrentPassword = () => {
        const passwordError = validate(currentPassword);
        if(passwordError) {
            setCurrentPasswordError(passwordError);
        } else {
            dispatch(setConfirmCurrentPasswordSaga(currentPassword))
        }
    };

    if (confirmPassword) {
        dispatch(currentPasswordSetFalse());
        navigation.navigate(CHANGE_PASSWORD);

    }

    return (
        <BackgroundSettings>
            <View style={styleSettingsScreen.container}>
                <Input
                    style={styleSettingsInput}
                    name='oldPassword'
                    placeholder=''
                    label='Введите sms'
                    message={currentPasswordError}
                    value={currentPassword}
                    keyboardType='numeric'
                    handleBlur={displayInputError(validate)}
                    handleChange={onChange}
                />
                <CustomButton
                    title='Подтвердить'
                    onPress={onCheckCurrentPassword}
                    styles={styleSettingsButtonString}
                />
            </View>
            {message ? <Portal>
                <AuthModal
                    message={message}
                    handleCloseModal={handleCloseModal}
                />
            </Portal> : null}
        </BackgroundSettings>
    );
};

export default passwordConfirmation

const styleSettingsScreens = StyleSheet.create({
    paper: {
        width: '89%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
    }
});