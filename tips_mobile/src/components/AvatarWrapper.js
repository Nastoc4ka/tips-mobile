import React from 'react';
import {Text, StyleSheet} from "react-native";
import Avatar from './Avatar';

const AvatarWrapper = ({source, textAvatar}) => {
    return (<>
            {source ?
                <Avatar source={source}/> :
                    <Text style={style.textAvatar}>{textAvatar}</Text>
                }
        </>)
};

export default AvatarWrapper;

const style = StyleSheet.create({
    textAvatar: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    }
});