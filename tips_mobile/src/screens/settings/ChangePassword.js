import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AuthModal, BackgroundSettings, CustomButton, IconInInputView, Input} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {Portal} from 'react-native-portalize';
import {clearMessage, updatePasswordSaga} from '../../redux/actions';
import {styleSettingsButtonString, styleSettingsInput, styleSettingsScreen} from "../../styles";
import {SETTINGS} from "../../constants/routeNames";
import {VisibilityHide, VisibilityShow} from '../../assets/icons';

const regexpPasswordFactory = () => new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g);

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
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [errors, setErrors] = useState(initialErrorsState);

    const displayInputError = (validatorFunc) => (data) => {
        setErrors(prevErrors => ({...prevErrors, ...validatorFunc(data)}));
    };

    const validatePassword = (password) => {
        if (regexpPasswordFactory().test(password)) {
            return {password: ''}
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
        }
    };

    useEffect(() => {
        if(message) setModalIsVisible(true);
    }, [message]);

    useEffect(() => () =>  {
        console.log('unmount');
        dispatch(clearMessage())}, []
    );

    const handleCloseModal = () => {
        setModalIsVisible(false);
        console.log('handleCloseModal');
        navigation.navigate(SETTINGS)
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