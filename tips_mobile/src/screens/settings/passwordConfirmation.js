import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AuthModal, BackgroundSettings, CustomButton, IconInInputView, Input} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {Portal} from 'react-native-portalize';
import {clearMessage, currentPasswordSetFalse, hideBlur, setConfirmCurrentPasswordSaga} from '../../redux/actions';
import {styleSettingsButtonString, styleSettingsInput, styleSettingsScreen} from "../../styles";
import {CHANGE_PASSWORD, SMS_CONFIRMATION} from "../../constants/routeNames";
import {VisibilityHide, VisibilityShow} from '../../assets/icons';

const EMPTY_INPUT_ERROR = 'поле должно быть заполнено';

const passwordConfirmation = ({navigation}) => {
    const dispatch = useDispatch();
    const {message, confirmPassword} = useSelector(state => state.systemReducer);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [currentPasswordError, setCurrentPasswordError] = useState('');

    const validate = (value) => value.trim() ? '' : EMPTY_INPUT_ERROR;

    const onChange = (value) => {
        setCurrentPassword(value);
        setCurrentPasswordError('');
    };

    const updateSecureTextEntry = () => {
        setSecureTextEntry(prev => !prev);
    };

    const handleCloseModal = () => {
        dispatch(clearMessage());
        setModalIsVisible(false);
    };

    const displayInputError = (validatorFunc) => (data) => {
        setCurrentPasswordError(validatorFunc(data));
    };

    const onCheckCurrentPassword = async () => {
        const passwordError = validate(currentPassword);
        if (passwordError) {
            setCurrentPasswordError(passwordError);
        } else {
            dispatch(setConfirmCurrentPasswordSaga(currentPassword));
        }
    };

    const navigateToChangePassword = () => navigation.navigate(CHANGE_PASSWORD);

    useEffect(() => {
        if (confirmPassword) {
            dispatch(currentPasswordSetFalse());
            setCurrentPassword('');
            setCurrentPasswordError('');
            dispatch(hideBlur());
            navigateToChangePassword();
        }
    }, [confirmPassword]);

    useEffect(() => {
        if (message) setModalIsVisible(true);
    }, [message]);


    return (
        <BackgroundSettings>
            <View style={styleSettingsScreen.container}>
                <Input
                    style={styleSettingsInput}
                    name='oldPassword'
                    placeholder='текущий пароль'
                    secureTextEntry={secureTextEntry}
                    label=''
                    message={currentPasswordError}
                    value={currentPassword}
                    handleBlur={displayInputError(validate)}
                    handleChange={onChange}
                >
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        <IconInInputView>
                            {secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>
                <CustomButton
                    title='Подтвердить'
                    onPress={onCheckCurrentPassword}
                    styles={styleSettingsButtonString}
                />
                <CustomButton
                    title='Забыли пароль?'
                    onPress={() => navigation.navigate(SMS_CONFIRMATION)}
                    styles={styleSettingsButtonString}
                />
            </View>
            <Portal>
                <AuthModal
                    modalIsVisible={modalIsVisible}
                    message={message}
                    handleCloseModal={handleCloseModal}
                />
            </Portal>
        </BackgroundSettings>
    );
};

export default passwordConfirmation