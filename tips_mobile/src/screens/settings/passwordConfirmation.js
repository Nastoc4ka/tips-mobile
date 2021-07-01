import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {BackgroundSettings, CustomButton, Input, AuthModal, IconInInputView} from "../../components";
import {useSelector, useDispatch} from "react-redux";
import {Portal} from 'react-native-portalize';
import {clearMessage, hideBlur, setConfirmCurrentPasswordSaga, currentPasswordSetFalse} from '../../redux/actions';
import {styleSettingsButton, styleSettingsInput, styleSettingsScreen, styleSettingsButtonBlue, styleSettingsButtonString} from "../../styles";
import {SMS_CONFIRMATION, CHANGE_PASSWORD} from "../../constants/routeNames";
import {VisibilityHide, VisibilityShow} from '../../assets/icons';

const EMPTY_INPUT_ERROR = 'поле должно быть заполнено';

const passwordConfirmation = ({navigation}) => {
    const dispatch = useDispatch();
    const {message, confirmPassword} = useSelector(state => state.systemReducer);

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
        dispatch(hideBlur());
    };

    const displayInputError = (validatorFunc) => (data) => {
        setCurrentPasswordError(validatorFunc(data));
    };

    const onCheckCurrentPassword = async () => {
        const passwordError = validate(currentPassword);
        if(passwordError) {
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