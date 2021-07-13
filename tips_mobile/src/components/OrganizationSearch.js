import React, { useRef, useState, useEffect } from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { getOrganizationsSaga } from '../redux/actions';
import {Input, SearchDropDown, IconInInputView} from './index'

const OrganizationSearch = ({error, setOrganizationInData}) => {
    const dispatch = useDispatch();
    const {organizations} = useSelector(state => state.authRegisterReducer);
    const organizationInputRef = useRef(null);
    const [searching, setSearching] = useState(false);
    const [focus, setFocus] = useState(false);
    const [filtered, setFiltered] = useState(organizations);
    const [organization, setOrganization] = useState({
        name: '',
        id: ''
    });

    const closeSearchOrganization = () => {
        if (!organization.id) {
            setOrganization({
                name: '',
                id: ''
            });
            setOrganizationInData('', '')
        }
        setFocus(false);
        setSearching(false);
        organizationInputRef.current.blur();
    };

    const handleSearch = (text) => {
        setOrganizationInData('', '');
        setOrganization({
            name: text,
            id: ''
        });

        if (text.trim().length > 2) {
            setSearching(true);
            const tempList = organizations.filter(item => {
                const itemToCheck = String(`${item.name} (${item.address})`).toLowerCase();
                const newString = String(text.toLowerCase());
                if (itemToCheck.startsWith(newString)) {
                    return item
                }
            });
            setFiltered(tempList);
        } else {
            setSearching(false);

            setFiltered(organisations);
        }
    };

    const handleChoosingOrganization = (id, nameAndAddress) => {
        setOrganizationInData(id, nameAndAddress);
        setOrganization({
            name: nameAndAddress,
            id
        });
        setSearching(false);
        setFocus(false);
        organizationInputRef.current.blur();
    };

    useEffect(() => {
        dispatch(getOrganizationsSaga());
    }, []);

    return (
        <View style={focus ? styles.container : null}>
            {focus 
                ? <TouchableOpacity style={styles.btn} onPress={closeSearchOrganization}>
                    <Text style={styles.text}>x</Text>
                </TouchableOpacity> 
                : null
            }
            
            <Input
                label='Заведение'
                onFocus={() => setFocus(true)}
                refs={organizationInputRef}
                value={organization.name}
                maxLength={60}
                message={error}
                handleChange={handleSearch}
            >
                <TouchableOpacity onPress={() => setOrganization({
                    name: '',
                    id: ''
                })}>
                    <IconInInputView>
                        {focus && organizations ? <Text style={styles.text}>x</Text> : null}
                    </IconInInputView>
                </TouchableOpacity>
            </Input>

            {searching 
                ? <SearchDropDown
                    onPress={(id, nameAndAddress) => handleChoosingOrganization(id, nameAndAddress)}
                    dataSource={filtered}
                /> 
                : null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 1,
        top: 0
    },
    btn: {
        marginLeft: 5,
        marginBottom: 5,
    },
    text: {
        color: 'grey',
        fontWeight: '800',
        fontSize: 20,
        justifyContent: 'center'
    }
});

export default OrganizationSearch;