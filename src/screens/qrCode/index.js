import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { buttonFill, buttonLight, main } from "../../styles";
import Background from "../../components/Background";
import { CustomButton, UserPreview } from '../../components';
import { getUser } from '../../services/serviceQueries';

const QRcode = () => {
    const [isGenerated, setIsGenerated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = getUser(10010);
        setUser(user);
    })

    return (
        <Background>
            <View style={paper}>
                {isGenerated ? 
                    <View style={wrappers.wrapper}>
                        <UserPreview name={user.firstName} lastName={user.lastName} avatar={user.avatar} id={user.id}/>
                        <QRCode
                            size={157}
                        />
                        <Text style={{fontSize: 30, paddingTop: 15}}>{user.id}</Text>

                        <View style={wrappers.buttonsWrapper}>
                            <CustomButton title='Сгенерировать новый' styles={button} />
                            <CustomButton title='Готово' styles={buttonFill} />
                        </View>
                    </View>
                :
                    <>
                        <Text style={main.headerText}>Сгенерировать QR код</Text>
                        <View style={{paddingTop: 24, width: '100%'}}>
                            <CustomButton title='Сгенерировать' styles={buttonFill} onPress={() => setIsGenerated(true)}/>
                        </View>
                    </>
                }
            </View>
        </Background>
    );
};

const paper = StyleSheet.compose({...main.paper, paddingHorizontal: 14});
const wrappers = StyleSheet.create({
    wrapper: {
        paddingTop: 33, 
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
    buttonsWrapper: {
        width: '100%',
        marginTop: 'auto',
        marginBottom: 30,
    } 
})
const button = StyleSheet.create({
    button: {
        ...buttonLight.button,
        marginBottom: 20
    },
    text: {...buttonLight.text}
})

export default QRcode