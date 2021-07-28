import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import {buttonLight, main} from "../../styles";
import {useSelector} from "react-redux";
import {AvatarView, Background, CustomButton, MainHeader} from '../../components';
import RNPrint from 'react-native-print';

const QRcode = () => {
    const qrCode = useRef();
    const {user} = useSelector(state => state.authLoginReducer);
    const [qrCodeBase64, setqrCodeBase64] = useState(null);

    useEffect(() => {
        qrCode.current.toDataURL(base64 => {
            setqrCodeBase64(base64);
        });
    });

    const printHTML = async () => {
        await RNPrint.print({
            html:
                `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%">
            <p style="font-size: 40pt; padding-bottom: 0; margin-bottom: -30pt">${user.firstName} ${user.lastName}</p>
            <p style="font-size: 50pt">${user.id}</p>
            <img src="data:image/png;base64, ${qrCodeBase64}" alt="Red dot" />
          </div>
        `,
        });
    };

    return (
        <Background>
            <MainHeader style={main.header} activePanel={'QR code'}/>
            <View style={paper}>
                <View style={wrappers.wrapper}>
                    <AvatarView source={user.avatar} firstName={user.firstName} id={user.id}/>

                    <QRCode
                        getRef={qrCode}
                        value="http://awesome.link.qr"
                        size={157}
                    />

                    <Text style={{fontSize: 30, paddingTop: 15}}>{user && user.id}</Text>

                    <View style={wrappers.buttonsWrapper}>
                        <CustomButton title='Печать' styles={button} onPress={printHTML}/>
                    </View>
                </View>
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