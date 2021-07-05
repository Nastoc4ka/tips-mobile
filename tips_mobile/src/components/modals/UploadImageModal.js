import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import ModalWrapper from './ModalWrapper';
import ImagePicker from 'react-native-image-crop-picker';

const UploadImageModal = ({handleCloseModal, setData}) => {
    const [takePhoto, setTakePhoto] = useState(null);

    const chooseFromLibrary = () => {
        ImagePicker.openPicker({
            width: 70,
            height: 70,
            cropping: true,
            includeBase64: true,
            includeExif: true,
        })
            .then(image => {
                setData((prevData) => ({
                    ...prevData,
                    avatar: `data:${image.mime};base64,` + image.data
                }));
                handleCloseModal();
            })
            .catch((e) => console.log(e));
    };

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 70,
            height: 70,
            cropping: true,
            includeBase64: true,
            includeExif: true,
        })
            .then(image => {
                setData((data) => ({
                    ...data,
                    avatar: {
                        uri: `data:${image.mime};base64,` + image.data,
                        width: image.width,
                        height: image.height,
                    }
                }));
                handleCloseModal();
            })
            .catch((e) => console.log(e));
    };

    return (
        <ModalWrapper onBackdropPress={handleCloseModal}>
            <TouchableHighlight
                style={styles.button}
                onPress={chooseFromLibrary}
                underlayColor='rgba(36, 168, 172, 0.5)'
            >
                <Text style={styles.buttonText}>загрузить из галереи</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                onPress={takePhotoFromCamera}
                underlayColor='rgba(36, 168, 172, 0.5)'
            >
                <Text style={styles.buttonText}>Сделать фото</Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.button}
                onPress={handleCloseModal}
                underlayColor='rgba(36, 168, 172, 0.5)'
            >
                <Text style={styles.buttonText}>закрыть</Text>
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
        paddingTop: 15,
        textAlign: 'center',
    },
    messageTitle: {
        fontSize: 20,
        textAlign: 'center',
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

export default UploadImageModal;