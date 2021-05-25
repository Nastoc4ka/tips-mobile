import { StyleSheet } from 'react-native';

export const styleMainScreens = StyleSheet.create({
    buttonsTabsWrapper: {
        position: 'absolute',
        zIndex: -11,
        marginTop: -33,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',

    },
    wrapper : {
        marginTop: 35,
    },
    text: {
        fontSize: 17,
        color: 'white',
        fontWeight: '600',
    }
});