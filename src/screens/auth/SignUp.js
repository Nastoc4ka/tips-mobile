import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import {buttonFill, buttonLight, main, styleInput} from '../../styles';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';
import { StyleSheet } from 'react-native';
import { VisibilityHide } from '../../assets/icons';
import { VisibilityShow } from '../../assets/icons';
import { registerSaga } from '../../redux/actions'

const SignUp = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authLoginReducer);
    console.log(user);
    const [data, setData] = React.useState({
        firstName: '',
        password: '',
        city: '',
        organisation: '',
        phoneNumber: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const nameInputChange = (name) => {
        console.log(name);
        if(name.trim()) {
            setData({
                ...data,
                firstName: name,
            });
        } else {
            setData({
                ...data,
                firstName: name,
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
        console.log(password);
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

    const cityInputChange = (city) => {
        console.log(city);
        if(city.trim()) {
            setData({
                ...data,
                city: city,
            });
        } else {
            setData({
                ...data,
                city: city,
                check_textInputChange: false
            });
        }
    };

    const organisationInputChange = (organisation) => {
        console.log(organisation);
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
        console.log(confirm_password);
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

    const handleAuthorisation = () => {
        const {firstName, organisation, password, city, phoneNumber} = data;
        dispatch(registerSaga({firstName, organisation, password, city, phoneNumber}));
    };
    return (
        <>
            <Text style={main.headerTextRegistration}>Добро пожаловать!</Text>
            <View style={{width: '100%'}}>
                <Input
                    autoCapitalize='words'
                    type='name'
                    name='name'
                    label='Имя'
                    maxLength={40}
                    handleChange={nameInputChange}
                />
                <Input
                    type='telephoneNumber'
                    keyboardType='numeric'
                    label='Телефон'
                    placeholder='+38 (0••) ••• •• ••'
                    handleChange={phoneInputChange}
                />
                <Input
                    type='addressCity'
                    label='Город'
                    maxLength={40}
                    handleChange={cityInputChange}

                />
                <Input
                    label='Заведение'
                    maxLength={60}
                    handleChange={organisationInputChange}

                />
                <Input
                    type='password'
                    label='Пароль'
                    placeholder='•••••••••'
                    secureTextEntry={data.secureTextEntry ? true : false}
                    maxLength={60}
                    handleChange={passwordInputChange}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ? <VisibilityHide /> : <VisibilityShow />}
                </TouchableOpacity>
                <Input
                    type='password'
                    label='Повторить пороль'
                    placeholder='•••••••••'
                    maxLength={60}
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    handleChange={confirmPasswordInputChange}
                />
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                    {data.confirm_secureTextEntry ? <VisibilityHide /> : <VisibilityShow />}
                </TouchableOpacity>
            </View>
            <CustomButton title='Готово' styles={btn} onPress={handleAuthorisation}/>
        </>
    )
};

const btn = StyleSheet.create({
    button: {
        ...buttonFill.button,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    text: buttonFill.text
});

export default SignUp