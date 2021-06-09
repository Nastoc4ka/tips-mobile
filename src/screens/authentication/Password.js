import React, { useState } from 'react';
import { View, Text , Dimensions, StyleSheet } from 'react-native';
import Keyboard from './Keyboard';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import PasswordDots from './PathwordDots';

const Password = () => {
    // const {avatar, firstName, lastName} = useSelector(state => state.authLoginReducer.user)
    //const truePassword = smth from asyncstorage
    const correctPassword = '1488'
    const [password, setPassword] = useState('');

    const handlePasswordEntry = (text) => {
        setPassword(password + text)
    } 

    const handleDelete = () => {
        setPassword(password.slice(0, -1))
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Avatar
                    // title={`${firstName[0]}${lastName[0] || ''}`}
                    containerStyle={styles.avatar}
                    title='MN'
                    rounded 
                    size="large" 
                    // source={avatar}
                />
                <Text style={styles.text}>ПИН-код</Text>
                <PasswordDots password={password} correctPassword={correctPassword} setPassword={setPassword}/>
            </View>
            <Keyboard handleDelete={handleDelete} handlePasswordEntry={handlePasswordEntry}/>
        </View>
    )
}

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
