import React from 'react';
import { StyleSheet, View } from 'react-native';
import DeleteBtn from './DeleteBtn';
import KeyBtn from './KeyBtn';

const Keyboard = ({handlePasswordEntry, handleDelete}) => {
   
    const renderKeys = () => {
        return Object.entries(buttons).map(([key, value]) => {
            if (value) {
                return <KeyBtn num={value.num} alphabeth={value.alphabeth} handlePasswordEntry={handlePasswordEntry} key={key} />
            } else {
                if (key === '9') {
                    return <View style={{width: 80}} key={key}></View>
                } else {
                    return <DeleteBtn handleDelete={handleDelete} key={key}/>
                }
            }
        })
    }

    return (
        <View style={styles.container}>
            {renderKeys()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '75%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 70,
    }
})

const buttons = [
    {
        num: '1',
        alphabeth: null
    },
    {
        num: '2',
        alphabeth: 'ABC'
    },
    {
        num: '3',
        alphabeth: 'DEF'
    },
    {
        num: '4',
        alphabeth: 'GHI'
    },
    {
        num: '5',
        alphabeth: 'JKL'
    },
    {
        num: '6',
        alphabeth: 'MNO'
    },
    {
        num: '7',
        alphabeth: 'PQRS'
    },
    {
        num: '8',
        alphabeth: 'TUV'
    },
    {
        num: '9',
        alphabeth: 'WXYZ'
    },
    null,
    {
        num: '0',
        alphabeth: null
    },
    null
]

export default Keyboard