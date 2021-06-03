import React, { useRef, useState } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet } from 'react-native';

const ModalWrapper = ({ children, onBackdropPress, isVisible  }) => {
    return (
        <Modal 
            isVisible={isVisible}
            backdropOpacity={0}
            onBackdropPress={onBackdropPress}
        >
            <View style={styles.content}>
              {children}
            </View>
        </Modal>
    )
}

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

export default ModalWrapper;