import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View,Text } from 'react-native-animatable';

const KeyBtn = ({num, alphabeth, handlePasswordEntry}) => {
    const onPress = () => {
        handlePasswordEntry(num)
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.num}>{num}</Text>
                {alphabeth && <Text style={styles.alphabeth}>{alphabeth}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 40,
        borderColor: '#fff',
        marginTop: 20
    },
    num: {
        fontSize: 36,
        lineHeight: 36,
        color: '#fff'
    },
    alphabeth: {
        fontSize: 9,
        lineHeight: 9,
        color: '#fff'
    }
})

export default KeyBtn;