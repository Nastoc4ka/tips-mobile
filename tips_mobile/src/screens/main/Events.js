import React from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Arrow_left, Arrow_right } from '../../assets/icons';

const marginNextBTN = {marginRight: Dimensions.get('window').width * 0.23};
const marginPrevBTN = {marginLeft: Dimensions.get('window').width * 0.23};
const Events =() => {

    let today = moment();
    let day = today.clone().startOf('month');
    let customDatesStyles = [];
    while(day.add(1, 'day').isSame(today, 'month')) {
        customDatesStyles.push({
            date: day.clone(),
            // Random colors
            //style: ,
            textStyle: {color: 'black'}, // sets the font color
            containerStyle: [styles.customDatesStyles], // extra styling for day container
            allowDisabled: true, // allow custom style to apply to disabled dates
        });
    }

    return (
        <View style={styles.container}>
            <CalendarPicker
                customDatesStyles={customDatesStyles}
                weekdays={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
                months={['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']}
                previousTitle={<Arrow_left/>}
                previousTitleStyle={marginPrevBTN}
                nextTitle={<Arrow_right/>}
                nextTitleStyle={marginNextBTN}
                width={Dimensions.get('window').width * 0.85}
                textStyle={{
                    fontFamily: "SF Pro Display Regular",
                    fontSize: 16,
                    color: '#000000',
                }}
            />
        </View>
    );
};

export default Events

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginLeft: 20,
        marginRight: 20,
    },
    customDatesStyles: {
        marginBottom: 10,
        borderTopColor: 'rgba(36, 168, 172, 0.5)',
        borderTopWidth: 0.5
    }
});