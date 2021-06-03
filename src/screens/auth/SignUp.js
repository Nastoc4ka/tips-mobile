import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { buttonFill, buttonLight, main, styleInput } from '../../styles';
import { CustomButton, Input, InputPhone, IconInInputView } from '../../components';
import { VisibilityHide, VisibilityShow } from '../../assets/icons';
import { registerSaga } from '../../redux/actions'
import { hideBlur, showBlur } from '../../redux/actions';
import { Portal } from 'react-native-portalize';
import AuthModal from '../../components/modals/AuthModal';

const SignUp = () => {
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisibility] = useState(false)
    const user = useSelector(state => state.authLoginReducer);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        city: '',
        organisation: '',
        phoneNumber: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const handleCloseModal = () => {
        dispatch(hideBlur())
        setModalVisibility(!isModalVisible)
    }

    const firstNameInputChange = (firstName) => {
        if(firstName.trim()) {
            setData({
                ...data,
                firstName: firstName,
            });
        } else {
            setData({
                ...data,
                firstName: firstName,
                check_textInputChange: false
            });
        }
    };

    const lastNameInputChange = (lastName) => {
        if(lastName.trim()) {
            setData({
                ...data,
                lastName: lastName,
            });
        } else {
            setData({
                ...data,
                lastName: lastName,
                check_textInputChange: false
            });
        }
    };

    const phoneInputChange = (number) => {
        if(number.trim()) {
            setData({
                ...data,
                phoneNumber: number,
            });
        } else {
            setData({
                ...data,
                phoneNumber: number,
                check_textInputChange: false
            });
        }
    };

    const passwordInputChange = (password) => {
        if(password.trim()) {
            setData({
                ...data,
                password: password,
            });
        } else {
            setData({
                ...data,
                password: password,
                check_textInputChange: false
            });
        }
    };

    const organisationInputChange = (organisation) => {
        if(organisation.trim()) {
            setData({
                ...data,
                organisation: organisation,
            });
        } else {
            setData({
                ...data,
                organisation: organisation,
                check_textInputChange: false
            });
        }
    };

    const confirmPasswordInputChange = (confirm_password) => {
        if(confirm_password.trim()) {
            setData({
                ...data,
                confirm_password: confirm_password,
            });
        } else {
            setData({
                ...data,
                confirm_password: confirm_password,
                check_textInputChange: false
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    };

    const handleAuthorization = () => {
        const {firstName, organisation, password, city, phoneNumber} = data;
        dispatch(registerSaga({firstName, organisation, password, city, phoneNumber}));
    };

    return (
        <>
            <Text style={main.headerTextRegistration}>Добро пожаловать!</Text>
            <ScrollView style={{width: '100%'}}>
                <Input
                    autoCapitalize='words'
                    type='name'
                    label='Имя'
                    maxLength={40}
                    handleChange={firstNameInputChange}
                />

                <Input
                    autoCapitalize='words'
                    type='name'
                    label='Фамилия'
                    maxLength={40}
                    handleChange={lastNameInputChange}
                />

                <InputPhone
                    type='telephoneNumber'
                    keyboardType='numeric'
                    label='Телефон'
                    placeholder='+38 (0••) ••• •• ••'
                    handleChange={phoneInputChange}
                />

                <Input
                    label='Заведение'
                    maxLength={60}
                    handleChange={organisationInputChange}

                />
                <Input
                    type='password'
                    secureTextEntry={data.secureTextEntry}
                    autoCapitalize="none"
                    label='Пароль'
                    placeholder='•••••••••'
                >
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        <IconInInputView>
                            {data.secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>
                <Input
                    type='password'
                    secureTextEntry={data.confirm_secureTextEntry}
                    autoCapitalize='none'
                    label='Повторить пороль'
                    placeholder='•••••••••'
                    handleChange={confirmPasswordInputChange}
                >
                    <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                        <IconInInputView>
                            {data.confirm_secureTextEntry ? <VisibilityHide /> : <VisibilityShow />}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>
            </ScrollView>

            <CustomButton title='Готово' styles={button} onPress={handleAuthorization}/>

            <Portal>
                <AuthModal handleCloseModal={handleCloseModal} isVisible={isModalVisible} message='Дякуємо за реєстрацію!'/>
            </Portal>
        </>
    )
};

const button = StyleSheet.create({
    button: {
        ...buttonFill.button,
        marginTop: 10,
        marginBottom: 20
    },
    text: buttonFill.text
});

export default SignUp