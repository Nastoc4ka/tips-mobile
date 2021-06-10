import React from 'react';
import { View } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import { Arrow_left, Arrow_right } from '../../assets/icons';


const Events =() => {
    return (
        <View>
            <CalendarPicker
                weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                previousComponent={<Arrow_left/>}
                nextComponent={<Arrow_right/>}
            />
        </View>
    );
};

export default Events