import { StyleSheet } from 'react-native';

export const styleNewsItem = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 76,
    },
    innerWrapper: {
        paddingVertical: 10,
        paddingRight: 10,
        flex: 1,
        flexDirection: 'row',
        height: 76,
        borderBottomColor: 'rgba(36, 168, 172, 0.5)',
        borderBottomWidth: 1,
    },
    isRead: {
        width: 23,
        justifyContent: "center",
        alignItems: 'center',
    },
    avatar: {
        marginRight: 13,
        justifyContent: "center",
        alignItems: 'center',
    },
    main: {
        justifyContent: "space-between",
        width: '60%',
    },
    author: {
        fontWeight: '600',
        fontSize: 17,
    },
    icons: {
        justifyContent: "space-between",
        width: '20%',
    },
    wrapperIcons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        width: '100%',
    },
    date: {
      color: '#24A8AC',
        fontWeight: '300',
        fontSize: 13,
        marginRight: 7,
    },
    icon: {
      marginTop: 2,
        marginLeft: 2,
    },
    reactions: {
        marginRight: 2,
        fontSize: 10,
        color: '#24A8AC',
        fontWeight: '300',
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