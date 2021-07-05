import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ModalWrapperFilter from './ModalWrapperFilter';
import CustomButton from "../CustomButton";

const FilterBirthdateAccessModal = ({filterOptionsBirthdateAccess, isVisible, filterBirthdate, handleCloseModal, handleChooseFilter}) => {

    const [pickedAccessOption, setPickedAccessOption] = useState(filterBirthdate);
    const handleChooseOption = (option) => {
        setPickedAccessOption(option);
    };

    return (
        <ModalWrapperFilter isVisible={isVisible} onBackdropPress={handleCloseModal}>
            <View style={stylesButtonHeaderButtons.wrapper}>
                <CustomButton
                    title='Отменить'
                    onPress={handleCloseModal}
                    styles={stylesButtonHeaderButtons}
                />
                <CustomButton
                    title='Готово'
                    onPress={() => handleChooseFilter(pickedAccessOption)}
                    styles={stylesButtonHeaderButtons}
                />
            </View>
            <View style={stylesFilterOptions.wrapper}>
                {filterOptionsBirthdateAccess.map((option) => {
                    return <CustomButton
                        key={option.access}
                        title={option.name}
                        onPress={() => handleChooseOption(option.access)}
                        styles={option.access === pickedAccessOption ? stylesChosen : stylesNotChosen}
                    />
                })}
            </View>
        </ModalWrapperFilter>
    )
};

const stylesButtonHeaderButtons = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        backgroundColor: '#017C31',
        flexDirection: 'row',
        height: 50,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#FFFFFF'
    }

});

const stylesFilterOptions = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
    },

});

const stylesChosen = StyleSheet.create({
    button: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: 'orange',
    },
});

const stylesNotChosen = StyleSheet.create({
    button: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white',
    }
});

export default FilterBirthdateAccessModal;