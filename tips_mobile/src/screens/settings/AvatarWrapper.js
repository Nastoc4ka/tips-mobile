import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import AvatarSettings from './AvatarSettings';

const AvatarWrapper = ({source, textAvatar}) => {
    return (<>
            {source ?
                <AvatarSettings source={source}/> :
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