import { StyleSheet, Platform } from 'react-native';

export const styleInput = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  input: {
    position: 'relative',
    borderColor: '#24A8AC',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    fontSize: 16,
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
      },
    }),
    paddingLeft: 23,
    marginBottom: 8,
    color: 'rgb(36, 168, 172)',
  },
  text: {
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 4,
    paddingLeft: 5,
    color: 'rgba(69, 69, 69, 1)',
  },
});
