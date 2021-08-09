import React, { useState } from 'react';
import { View, Text , Dimensions, StyleSheet } from 'react-native';
import Keyboard from './Keyboard';
import { useSelector } from 'react-redux';
import PasswordDots from './PathwordDots';
import {styleSettingsScreen} from "../../styles";
import {AvatarWrapper} from "../../components";

const Password = ({handleAuthSecurity}) => {
    const {user} = useSelector(state => state.authLoginReducer);
    const [password, setPassword] = useState('');

    const handlePasswordEntry = (text) => {
        setPassword(password + text)
    };

    const handleDelete = () => {
        setPassword(password.slice(0, -1))
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styleSettingsScreen.avatar}>
                    <AvatarWrapper
                        source={user.avatar}
                        textAvatar={user.firstName[0]}
                    />
                </View>
                <Text style={styles.text}>ПИН-код</Text>
                <PasswordDots password={password} handleAuthSecurity={handleAuthSecurity} setPassword={setPassword}/>
            </View>
            <Keyboard handleDelete={handleDelete} handlePasswordEntry={handlePasswordEntry}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#00A03E',
    },
    wrapper: {
        width: '40%',
        flex: 1,

        justifyContent: 'center'
    },
    avatar: {
        backgroundColor: 'lightgrey', 
        alignSelf: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        letterSpacing: 1,
        color: '#fff',
        paddingBottom: 25,
        paddingTop: 15
    },
});

export default Password;