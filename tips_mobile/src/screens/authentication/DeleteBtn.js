import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Back } from '../../assets/icons';

const DeleteBtn = ({handleDelete}) => {
    return (  
        <TouchableOpacity onPress={handleDelete}>
            <View style={styles.container}>
                <View style={styles.button}>
                    <Back />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        width: '70%',
        backgroundColor: '#0087CB',
        borderRadius: 6,
        alignItems: 'center',
        paddingVertical: 10
    }
})

export default DeleteBtn;