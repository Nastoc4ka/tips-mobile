import { StyleSheet } from 'react-native';

const styleButton = StyleSheet.create({
    all: {
        width: '91%',
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 5,
    },
    fill: {
        backgroundColor: '#FFA200',
    },
    light: {
        borderColor: '#FFA200',
        borderWidth: 2,
        color: '#0087CB',
    },
    textFill: {
        fontSize: 24,
        color: '#fff',
    },
    textLight: {
        fontSize: 24,
        color: '#0087CB',
    }
})

export const buttonFill = StyleSheet.create({
    button: {...styleButton.all, ...styleButton.fill},
    text: styleButton.textFill
});

export const buttonLight = StyleSheet.create({
    button: {...styleButton.all, ...styleButton.light},
    text: styleButton.textLight
})