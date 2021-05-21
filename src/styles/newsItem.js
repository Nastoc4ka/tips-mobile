import { StyleSheet } from 'react-native';

export const styleNewsItem = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        marginLeft: 13,
        paddingHorizontal: 10,
        maxHeight: 76,
        borderBottomColor: 'rgba(36, 168, 172, 0.5)',
        borderBottomWidth: 1,
    },
    avatar: {
        width: '25%',
        justifyContent: "center",

    },
    main: {
        justifyContent: "space-between",
        width: '55%',
    },
    author: {
        fontWeight: '600',
        fontSize: 17,
    },
    label: {
        fontWeight: '400',
        fontSize: 13,
    },
    description: {
        fontWeight: '400',
        fontSize: 13,
        color: 'rgba(69, 69, 69, 0.5)',
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