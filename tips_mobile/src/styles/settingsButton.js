import { StyleSheet, Dimensions } from 'react-native';

export const styleSettingsButton = StyleSheet.create({
    button: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 16,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderBottomColor: 'rgba(36, 168, 172, 0.5)',
        borderBottomWidth: 1
    },
    text: {
        marginLeft: 15,
        fontSize: 17,
    }
});