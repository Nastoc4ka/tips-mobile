import React from 'react';
import {Image, StyleSheet, View} from "react-native";

const Avatar = ({source}) => {
    return <View style={style.wrapper}>
    <Image style={style.image} source={{uri: source}}/>
    </View>
};

export default Avatar;

const style = StyleSheet.create({
    wrapper: {
        backgroundColor: 'lightgrey',
        borderRadius: 67 / 2,
        width: 70,
        height: 70,
        overflow: 'hidden',
    },
    image: {
        width: 70,
        height: 70,
    }
});

