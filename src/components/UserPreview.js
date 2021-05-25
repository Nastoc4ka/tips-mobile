import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { main } from '../styles'

const UserPreview = ({ name, id, avatar, lastName, admin = false }) => {
    return (
        <View style={styles.wrapepr}>
            <Avatar 
                title={`${name[0]}${lastName[0]}`}
                rounded 
                size="medium" 
                source={avatar}
            />
            <Text style={styles.name}>{name} {admin ? lastName : null}</Text>
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