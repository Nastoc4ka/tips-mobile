import React from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const ModalWrapperFilter = ({ children, onBackdropPress, isVisible }) => {
    return (
        <Modal 
            isVisible={isVisible}
            backdropOpacity={0}
            onBackdropPress={onBackdropPress}
            swipeDirection={'down'}
            animationOut={'slideOutDown'}
            style={styles.view}
        >
            <SafeAreaView style={styles.content}>
              {children}
            </SafeAreaView>
        </Modal>
    )
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#00A03E',
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    }
  });

export default ModalWrapperFilter;