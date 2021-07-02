import React, {useState, useCallback} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {BackgroundSettings, CustomButton, Input, AuthModal, IconInInputView} from "../../components";
import {useSelector, useDispatch} from "react-redux";
import {Portal} from 'react-native-portalize';
import { clearMessage, hideBlur, updatePasswordSaga } from '../../redux/actions';
import {styleSettingsButton, styleSettingsInput, styleSettingsScreen, styleSettingsButtonBlue, styleSettingsButtonString} from "../../styles";
import {SETTINGS} from "../../constants/routeNames";
import {VisibilityHide, VisibilityShow} from '../../assets/icons';

const regexpFactory = () => new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g);

const initialErrorsState = {
    password: '',
    confirm_password: '',
};

const initialDataState = {
    password: '',
    confirm_password: '',
    secureTextEntry: true,
    confirm_secureTextEntry: true,
};

const passwordConfirmation = ({navigation}) => {
    const dispatch = useDispatch();
    const {message} = useSelector(state => state.systemReducer);
    const [data, setData] = useState(initialDataState);
    const [errors, setErrors] = useState(initialErrorsState);

    const displayInputError = (validatorFunc) => (data) => {
        setErrors(prevErrors => ({...prevErrors, ...validatorFunc(data)}));
    };

    const validatePassword = (password) => {
        if (regexpFactory().test(password)) {
            return { password: ''}
        } else {
            return {
                password: 'Пароль должен содержать хотя бы 8 символов, заглавную, строчную латинскую букву и цифру.'
            }
        }
    };

    const onChangePassword = (password) => {
        setData({
            ...data,
            password,
        });
        displayInputError(validatePassword)(password);
    };

    const updateSecureTextEntry = (key) => {
        setData(prevData => ({
            ...prevData,
            [key]: !prevData.[key],
        }));
    };

    const validateConfirmPassword = (confirm_password) => {
        if (confirm_password !== data.password) {
            return {
                confirm_password: 'Пароль-подтверждение не совпадают',
            }
        } else {
            return {
                confirm_password: '',
            }
        }
    };

    const onChangeConfirmPassword = (confirm_password) => {
        setData({
            ...data,
            confirm_password,
        });
    };

    const validateForm = (dataToValidate) => {
        return {
            ...validatePassword(dataToValidate.password),
            ...validateConfirmPassword(dataToValidate.confirm_password)
        };
    };

    const handleSetNewPassword = () => {
        const passwordErrors = validateForm(data);
        const errorArray = Object.entries(passwordErrors).filter(([key, value]) => value.length);
        if (errorArray.length) {
            setErrors(passwordErrors);
        } else {
            dispatch(updatePasswordSaga(data.password));
            setData(initialDataState);
        }
    };

    const redirect = useCallback(() => {
        navigation.navigate(SETTINGS);
    }, [message]);

    const handleCloseModal = () => {
        dispatch(clearMessage());
        redirect();
    };

    return (
        <BackgroundSettings>
            <View style={styleSettingsScreen.container}>
                <Input
                    type='password'
                    style={styleSettingsInput}
                    name='oldPassword'
                    secureTextEntry={data.secureTextEntry}
                    autoCapitalize='none'
                    label='Пароль'
                    value={data.password}
                    message={errors.password}
                    handleChange={onChangePassword}
                    placeholder='•••••••••'
                >
                    <TouchableOpacity onPress={() => updateSecureTextEntry('secureTextEntry')}>
                        <IconInInputView>
                            {data.secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>
                <Input
                    type='password'
                    style={styleSettingsInput}
                    name='oldPassword'
                    autoCapitalize='none'
                    secureTextEntry={data.confirm_secureTextEntry}
                    label='Повторить пороль'
                    placeholder='•••••••••'
                    message={errors.confirm_password}
                    value={data.confirm_password}
                    handleChange={onChangeConfirmPassword}
                    handleBlur={displayInputError(validateConfirmPassword)}
                >
                    <TouchableOpacity onPress={() => updateSecureTextEntry('confirm_secureTextEntry')}>
                        <IconInInputView>
                            {data.confirm_secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>
                <CustomButton
                    title='Сохранить'
                    onPress={handleSetNewPassword}
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