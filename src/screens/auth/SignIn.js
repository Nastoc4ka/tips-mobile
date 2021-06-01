import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {buttonFill, buttonLight, styleAuth} from '../../styles';
import CustomButton from '../../components/CustomButton';
import { Input, IconInInputView } from '../../components';
import {VisibilityHide, VisibilityShow} from '../../assets/icons';
import {AuthContext} from '../../context/AuthContext';


const SignIn = ({handleRegistrationClick}) => {
    const [data, setData] = React.useState({
        phoneNumber: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });


    const {signIn} = React.useContext(AuthContext);

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

        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        signIn(foundUser);
    };
    console.log(data);
    return (
        <>
            <Text style={styleAuth.headerSignIn}>Привет</Text>
            <View style={{width: '100%', paddingBottom: 58}}>
                <Input
                    type='telephoneNumber'
                    keyboardType='numeric'
                    label='Телефон'
                    placeholder='+38 (0••) ••• •• ••'
                />
                <Input
                    type='password'
                    secureTextEntry={data.secureTextEntry}
                    autoCapitalize="none"
                    label='Пароль'
                    placeholder='•••••••••'
                    maxLength={60}
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
        </>
    )
};

export default SignIn