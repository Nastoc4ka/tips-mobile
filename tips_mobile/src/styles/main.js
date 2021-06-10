import { StyleSheet, Dimensions } from 'react-native';

export const main = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '#00A03E'
    },
    paper: {
      width: '89%',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
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
    },
    header: {
      width: '80%',
      marginTop: 10,
      height: 80,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headerText: {
      fontSize: 30,
      paddingTop: 30,
      paddingBottom: 16,
      paddingHorizontal: 35,
      textAlign: 'center',
    },
    headerTextRegistration: {
      fontSize: 30,
      paddingTop: 30,
      paddingBottom: 16,
      textAlign: 'center',
    },
    title: {
      fontSize: 13,
    },
    subtitle: {
      fontSize: 13,
      color: 'rgba(69, 69, 69, 0.5)',
    }
});