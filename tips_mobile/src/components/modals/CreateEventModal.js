import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ModalWrapper from './ModalWrapper';
import CustomButton from '../CustomButton';
import Input from '../Input';

const CANCEL_BTN_TEXT = 'Отмена';
const ADD_BTN_TEXT = 'Добавить';

const CreateEventModal = ({ data, message, handleCloseModal, modalIsVisible, handleChange }) => {
  const closeModal = () => {
    handleCloseModal();
  };

  return (
    <ModalWrapper modalIsVisible={modalIsVisible} onBackdropPress={closeModal}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Добавить событие</Text>
        <Text style={styles.date}>{data.chosenDate}</Text>
      </View>
      <View style={styles.inputsWrapper}>
        <Input
          label="Тема"
          value={data.title}
          //style={styleTheme}
          maxLength={100}
          autoCapitalize="sentences"
          message={message}
          onChangeText={(text) => handleChange(text, 'title')}
        />
        <Input
          label="Текст"
          height={90}
          multiline
          numberOfLines={4}
          value={data.text}
          autoCapitalize="sentences"
          //style={styleText}
          maxLength={200}
          onChangeText={(text) => handleChange(text, 'text')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <CustomButton
          title={CANCEL_BTN_TEXT}
          styles={styleBTN}
          onPress={closeModal}
          underlayColor="rgba(36, 168, 172, 0.5)"
        />
        <CustomButton
          title={ADD_BTN_TEXT}
          styles={{ ...styleBTN, ...styleBTNAdd }}
          onPress={closeModal}
          underlayColor="rgba(36, 168, 172, 0.5)"
        />
      </View>
    </ModalWrapper>
  );
};

export default CreateEventModal;

const styleBTNAdd = StyleSheet.create({
  rightButtonLayout: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(36, 168, 172, 0.5)',
  },
  text: {
    color: '#FFA200',
    fontWeight: '600',
    fontSize: 17,
  },
});

const styleBTN = StyleSheet.create({
  button: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    alignItems: 'center',
    width: '50%',
    borderTopColor: 'rgba(36, 168, 172, 0.5)',
    borderTopWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontSize: 17,
  },
});

const styleTheme = StyleSheet.create({
  wrapper: {},
  input: {
    paddingVertical: 10,
    fontSize: 17,
  },
  text: {
    paddingVertical: 10,
    fontSize: 17,
  },
});

const styleText = StyleSheet.create({
  wrapper: {},
  input: {
    fontSize: 17,
  },
  text: {
    fontSize: 17,
  },
});

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
  },
  date: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0087CB',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  headerWrapper: {
    padding: 22,
  },
  inputsWrapper: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
});
