import { StyleSheet } from 'react-native';

export const styleMainScreens = StyleSheet.create({
    header: {
        width: '80%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    buttonsTabsWrapper: {
        position: 'absolute',
        zIndex: -11,
        marginTop: -33,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',

    },
    text: {
        fontSize: 17,
        color: 'white',
        fontWeight: '600',
    },
    paper: {
        position: 'relative',
        zIndex: 1,
        width: '89%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
      },
});