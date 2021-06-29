import { StyleSheet } from 'react-native';

const styleSettingsHeaderButtonRight = StyleSheet.create({
    text: {
        color: '#0087CB'
    }
});

const styleSettingsHeader = StyleSheet.create({
    wrapperSafe: {
        width: '100%',
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
    },
    header: {
        width: '80%',
        marginTop: 10,
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    headerText: {
        fontSize: 17,
        fontWeight: '600',
    }
});

export {
    styleSettingsHeader,
    styleSettingsHeaderButtonRight,
}