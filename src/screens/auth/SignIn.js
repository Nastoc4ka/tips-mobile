import React, { useState, useContext } from 'react';
import { styleAuth, buttonFill, buttonLight } from '../../styles';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Input, IconInInputView, CustomButton, InputPhone } from '../../components';
import { VisibilityHide, VisibilityShow } from '../../assets/icons';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { hideBlur, showBlur } from '../../redux/actions';
import { Portal } from 'react-native-portalize';
import AuthModal from '../../components/modals/AuthModal';
const containsLetters = /^.*[a-z]{1,}[A-Z]{1,}[0-9]{1,}.*{8,}$/;

const SignIn = ({handleRegistrationClick}) => {
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisibility] = useState(false)
    const [data, setData] = useState({
        phoneNumber: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const handleCloseModal = () => {
        setModalVisibility(false)
        setTimeout(() => dispatch(hideBlur()), 400) 
    }

    const { signIn } = useContext(AuthContext);

    const phoneInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    };

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData((dataPrev) => ({
            ...dataPrev, secureTextEntry: !dataPrev.secureTextEntry
        }));
    };

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    };

    const loginHandle = (phoneNumber, password) => {
        dispatch(showBlur());
        setModalVisibility(true);
        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });

        // if (data.username.length == 0 || data.password.length == 0) {
        //     Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }

        // if (foundUser.length == 0) {
        //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }
        // signIn(foundUser);
    };

    const handleChange = (text) => {
        console.log(containsLetters.test(text))
    }

    return (
        <>
            <Text style={styleAuth.headerSignIn}>Привет</Text>
            <View style={{width: '100%', paddingBottom: 58}}>
                <InputPhone 
                    label='Телефон'
                />

                <Input
                    type='password'
                    secureTextEntry={data.secureTextEntry}
                    autoCapitalize="none"
                    label='Пароль'
                    placeholder='•••••••••'
                    maxLength={60}
                    handleChange={handleChange}
                >
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        <IconInInputView>
                            {data.secureTextEntry ? <VisibilityHide/> : <VisibilityShow/>}
                        </IconInInputView>
                    </TouchableOpacity>
                </Input>
            </View>

            <CustomButton
                onPress={() => {
                    loginHandle(data.username, data.password)
                }}
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
                <AuthModal handleCloseModal={handleCloseModal} isVisible={isModalVisible} message='Ваш аккаунт ще не верифіковано!'/>
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

