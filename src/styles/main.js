import { StyleSheet, Dimensions } from 'react-native';

export const styleBackground = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '#00A03E'
    },
    bottom: {
      position: 'absolute',
      zIndex: -1,
      bottom: 0,
      flex: 1, 
      width: 0,
      height: '36%',
      borderTopColor: 'transparent',
      borderTopWidth: Dimensions.get('window').width/4,
      borderRightColor: 'transparent',
      borderRightWidth: 0,
      borderLeftColor: '#017C31',
      borderLeftWidth: Dimensions.get('window').width
    }
});