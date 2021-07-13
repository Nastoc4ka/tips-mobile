import { StyleSheet } from 'react-native';

export const styleSettingsScreen = StyleSheet.create({
    container: {
        marginTop: 34,
    },
    avatar: {
        borderRadius: 67 / 2,
        width: 67,
        height: 67,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'grey'
    },
    textPhoto: {
        color: 'grey',
        backgroundColor: 'white',
        position: 'absolute',
        lineHeight: 15,
        bottom: 0,
        width: 60,
        textAlign: 'center',
        fontSize: 8,
    },
    avatarLabelName: {
        marginTop: 4,
        color: '#454545',
        fontSize: 12,
    },
    avatarLabelId: {
        color: 'grey',
        fontSize: 13,
        marginBottom: 15,
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 16,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderBottomColor: 'rgba(36, 168, 172, 0.5)',
        borderBottomWidth: 1,

    },
    textButton: {
        marginLeft: 15,
        fontSize: 17,
    },
    wrapperBtn: {
        width: '100%',
        marginTop: 36,
    }
});