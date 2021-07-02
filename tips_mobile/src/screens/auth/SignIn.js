import React, {useEffect, useState} from 'react';
import {buttonFill, buttonLight, styleAuth} from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomButton, IconInInputView, Input} from '../../components';
import {VisibilityHide, VisibilityShow} from '../../assets/icons';
import {clearMessage, loginSaga} from '../../redux/actions';
import {Portal} from 'react-native-portalize';
import AuthModal from '../../components/modals/AuthModal';
import InputPhone from "../../components/InputPhone";

const SignIn = ({handleRegistrationClick}) => {
    const dispatch = useDispatch();
    const {message} = useSelector(state => state.systemReducer);
    const [onLogin, setOnLogin] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const [data, setData] = useState({
        phoneNumber: '',
        password: '',
        secureTextEntry: true,
    });
    const [errors, setErrors] = useState({
        phoneNumber: '',
        password: '',
    });

    const handleCloseModal = () => {
        setModalIsVisible(false);
        dispatch(clearMessage());
    };

    const validatePhoneNumber = (text) => {
        if (text.length < 19) {
            setErrors({
                ...errors,
                phoneNumber: 'некорректный номер',
            });
        } else {
            setErrors({
                ...errors,
                phoneNumber: '',
            });
        }
    };

    const validatePhoneNumberCorrect = (phoneNumber) => {
        setData({
            ...data,
            phoneNumber,
        });
        if (phoneNumber.length === 19) {
            setErrors({
                ...errors,
                phoneNumber: '',
            });
        }
    };

    const passwordHandleChange = (password) => {
        setData({
            ...data,
            password,
        });
        setErrors({
            ...errors,
            password: '',
        });
    };

    const updateSecureTextEntry = () => {
        setData((dataPrev) => ({
            ...dataPrev, secureTextEntry: !dataPrev.secureTextEntry
        }));
    };

    const handleLogin = () => {
        validatePhoneNumber(data.phoneNumber);
        const checkFields = Object.entries(data).filter(([key, value]) => value.length === 0);
        if (checkFields.length) {
            checkFields.map(([key]) => {
                setErrors((errors) => ({...errors, [key]: 'поле должно быть заполнено'}))
            })
        }
        setOnLogin(true);
    };

    useEffect(() => {
        const currentErrors = Object.entries(errors).filter(([key, value]) => value.length > 0);
        if (!currentErrors.length && onLogin) {
            dispatch(loginSaga(data));
        }

        setOnLogin(false)
    }, [errors, onLogin]);

    useEffect(() => {
        if (message) setModalIsVisible(true);
    }, [message]);

    return (<>
            <Text style={styleAuth.headerSignIn}>Привет</Text>
            <KeyboardAvoidingView
                style={{width: '100%', paddingBottom: 58}}
                behavior="padding">
                <ScrollView>
                    <InputPhone
                        label='Телефон'
                        handleChange={validatePhoneNumberCorrect}
                        handleBlur={validatePhoneNumber}
                        message={errors.phoneNumber}
                    />
                    <Input
                        maxWidth='90%'
                        type='password'
                        secureTextEntry={data.secureTextEntry}
                        autoCapitalize="none"
                        label='Пароль'
                        placeholder='•••••••••'
                        maxLength={60}
                        handleChange={passwordHandleChange}
                        message={errors.password}
                    >
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            <IconInInputView>
                                {data.secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                            </IconInInputView>
                        </TouchableOpacity>
                    </Input>
                </ScrollView>
            </KeyboardAvoidingView>

            <CustomButton
                onPress={handleLogin}
                title='Войти'
                styles={buttonFill}
            />

            <Text style={{fontSize: 16, paddingTop: 16, paddingBottom: 8}}>Нет профиля?</Text>

            <CustomButton
                onPress={handleRegistrationClick}
                title='Регистрация'
                styles={buttonLight}
            />
            <Portal>
                <AuthModal
                    modalIsVisible={modalIsVisible}
                    handleCloseModal={handleCloseModal}
                    message={message}/>
            </Portal>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

export default SignIn