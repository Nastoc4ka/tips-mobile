import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet } from 'react-native';

const ModalWrapper = ({ children, onBackdropPress, modalIsVisible }) => {
  console.log(modalIsVisible);
  return (
    <Modal
      isVisible={modalIsVisible}
      backdropOpacity={0}
      onBackdropPress={onBackdropPress}
      animationOut={'slideOutDown'}
    >
      <View style={styles.content}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
  },
});

export default ModalWrapper;
