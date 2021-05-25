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
        width: '100%',
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        fontSize: 17,
        color: 'white',
        fontWeight: '600',
    }
});