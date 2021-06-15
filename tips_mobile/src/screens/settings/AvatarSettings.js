import React from 'react';
import {Image, StyleSheet} from "react-native";

const AvatarSettings = ({source}) => {
    return <Image style={style.image} source={{uri: source}}/>
};

export default AvatarSettings;

const style = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
    }
});

