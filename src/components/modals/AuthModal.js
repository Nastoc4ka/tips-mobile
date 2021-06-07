import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import ModalWrapper from './ModalWrapper';

const AuthModal = ({ message, handleCloseModal }) => {
    console.log(message);
  return (
    <ModalWrapper onBackdropPress={handleCloseModal}>
      <View style={styles.messageWrapper}>            
        <Text style={styles.messageTitle}>{message.title}</Text>
        <Text style={styles.message}>{message.text}</Text>
      </View>  

      <TouchableHighlight 
        style={styles.button} 
        onPress={handleCloseModal} 
        underlayColor='rgba(36, 168, 172, 0.5)'
      >
        <Text style={styles.buttonText}>OK</Text>
      </TouchableHighlight>
    </ModalWrapper>
  )
};

const styles = StyleSheet.create({
    content: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 10
    },
    message: {
      fontSize: 15,
      textAlign: 'center',
    },
    messageTitle: {
      fontSize: 20,
      textAlign: 'center',
      paddingBottom: 15
    },
    messageWrapper: {
      padding: 22,
    },
    button: {
      paddingHorizontal: 22,
      paddingVertical: 14,
      alignItems: 'center',
      width: '100%',
      borderTopColor: 'rgba(36, 168, 172, 0.5)',
      borderTopWidth: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    },
    buttonText: {
      fontSize: 17
    }
  });

export default AuthModal;