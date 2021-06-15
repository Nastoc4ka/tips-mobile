import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { main } from '../styles'

const UserPreview = ({ firstName, id, avatar, lastName, admin = false }) => {
    return (
        <View style={styles.wrapepr}>
            <Avatar
                title={`${firstName[0]}${lastName[0] || ''}`}
                rounded 
                size="medium" 
                source={avatar}
            />
            <Text style={styles.name}>{firstName} {admin ? lastName : null}</Text>
            <Text style={styles.lastName}>{id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapepr: {
        paddingBottom: 20
    },
    name: {...main.title, textAlign: 'center'},
    lastName: {...main.subtitle, textAlign: 'center'}
})

export default UserPreview;