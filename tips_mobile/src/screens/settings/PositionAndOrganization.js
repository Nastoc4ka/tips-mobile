import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const PositionAndOrganization = ({position, organization}) => {
    return <View style={style.wrapper}>
        <Text style={style.text}>Ресторан, позиция</Text>
        <View style={style.input}>
            <Text style={style.inputReadOnly}>{organization}</Text>
            <Text style={style.inputReadOnly}>{position}</Text>
        </View>
    </View>
};

export default PositionAndOrganization;

const style = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 35,
    },
    text: {
        marginBottom: 12,
        fontSize: 13,
        marginLeft: 14,
        color: '#454545',
    },
    inputReadOnly: {
        fontSize: 17,
        marginVertical: 13,
        paddingLeft: 14,
        color: 'rgba(69, 69, 69, 0.5)'
    },
    input: {
        width: '100%',
        paddingLeft: 14,
        backgroundColor: '#FFFFFF',
        borderBottomColor: 'rgba(36, 168, 172, 0.5)',
        borderBottomWidth: 1,
        borderTopColor: 'rgba(36, 168, 172, 0.5)',
        borderTopWidth: 1,
        ...Platform.select({
            ios: {
                paddingVertical: 11,
                paddingRight: 46,
            },
            android: {
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 23,
            }
        }),
    }
});

