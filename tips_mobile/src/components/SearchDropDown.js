import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default SearchDropDown = ({dataSource, onPress}) => {
    return (
        <ScrollView style={styles.container}>
            {
                dataSource.length ?
                    dataSource.map(item => {
                        const organisationAndAddress = `${item.name} (${item.address})`;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => onPress(item.id, organisationAndAddress)}
                            >
                                <Text style={styles.organisationText}>{item.name}</Text>
                                <Text style={styles.addressText}>{item.address}</Text>
                            </TouchableOpacity>
                        )
                    })
                    :
                    <View
                        style={styles.noResultView}>
                        <Text style={styles.noResultText}>Организацию не найдено</Text>
                    </View>
            }
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        flex: 1,
    },
    organisationText: {
        marginTop: 10,
        fontSize: 14,
    },
    addressText: {
        fontSize: 12,
        color: 'grey',
    },
    noResultView: {
        alignSelf: 'center',
        // height: 100,
        width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center'
    },
    noResultText: {
        fontSize: 12,
        //color: 'white'
    },

});