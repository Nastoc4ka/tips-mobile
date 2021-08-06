import {StyleSheet, Dimension, Dimensions, Platform} from 'react-native';

export const styleSettingsInput = StyleSheet.create({
    wrapper: {
        width: Dimensions.get('window').width,
        marginBottom: 25,
    },
    text: {
        marginBottom: 12,
        fontSize: 13,
        marginLeft: 14,
        color: '#454545',
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