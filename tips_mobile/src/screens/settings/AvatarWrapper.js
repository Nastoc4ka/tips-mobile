import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import AvatarSettings from './AvatarSettings';

const AvatarWrapper = ({source, textAvatar, onPress}) => {
    return (
        <TouchableOpacity
            style={style.avatar}
            onPress={onPress}
        >
            {source ?
                <AvatarSettings source={source}/> :
                <View>
                    <Text style={style.textAvatar}>{textAvatar}</Text>
                </View>}
            <Text style={style.textPhoto}>Фото</Text>
        </TouchableOpacity>
    )
};

export default AvatarWrapper;

const style = StyleSheet.create({
    avatar: {
        marginTop: 34,
        borderRadius: 67 / 2,
        width: 67,
        height: 67,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
    },
    textAvatar: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    textPhoto: {
        color: 'grey',
        backgroundColor: 'white',
        position: 'absolute',
        lineHeight: 15,
        bottom: 0,
        width: 60,
        textAlign: 'center',
        fontSize: 8,
    }
});