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
    },
    panelAll: {
        position: 'relative',
        backgroundColor: 'white',
        width: '45%',
        alignItems: 'center',
        paddingVertical: 13,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    panelAllText: {
        fontSize: 17,
        color: 'black',
    },
    panelActive: {
        color: '#FFA200',
    },
    panelActiveText: {
        color: '#FFA200',
        fontWeight: '600',
    },
    panelNotActive: {
        shadowColor: '#24A8AC',
        ...Platform.select({
            ios: {
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    panelNotActiveText: {
    },
});

export const buttonFill = StyleSheet.create({
    button: {...styleButton.all, ...styleButton.fill},
    text: styleButton.textFill
});

export const buttonLight = StyleSheet.create({
    button: {...styleButton.all, ...styleButton.light},
    text: styleButton.textLight
})
export const buttonPanelActive = StyleSheet.create({
    button: {...styleButton.panelAll, ...styleButton.panelActive},
    text: {...styleButton.panelAllText, ...styleButton.panelActiveText}
})

export const buttonPanelNotActive = StyleSheet.create({
    button: {...styleButton.panelAll, ...styleButton.panelNotActive},
    text: {...styleButton.panelAllText, ...styleButton.panelNotActiveText}
})