import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import AvatarSettings from './AvatarSettings';

const AvatarWrapper = ({source, textAvatar}) => {
    return (<>
            {source ?
                <AvatarSettings source={source}/> :
                <View>
                    <Text style={style.textAvatar}>{textAvatar}</Text>
                </View>}
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