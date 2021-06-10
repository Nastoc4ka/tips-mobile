import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { buttonLight, main } from "../../styles";
import Background from "../../components/Background";
import { CustomButton, UserPreview } from '../../components';
import { getUser } from '../../services/serviceQueries';
import RNPrint from 'react-native-print';

const QRcode = () => {
  const qrCode = useRef();
  const [user, setUser] = useState(null);
  const [qrCodeBase64, setqrCodeBase64] = useState(null)

  useEffect(() => {
      const user = getUser(10010);
      setUser(user);

      qrCode.current.toDataURL(base64 => {
        setqrCodeBase64(base64);
      });
  })

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
      <View style={paper}>
        <View style={wrappers.wrapper}>
          { user && <UserPreview firstName={user.firstName} lastName={user.lastName} avatar={user.avatar} id={user.id}/> }

          <QRCode
            getRef={qrCode}
            size={157}
          />

          <Text style={{fontSize: 30, paddingTop: 15}}>{user && user.id}</Text>

          <View style={wrappers.buttonsWrapper}>
              <CustomButton title='Печать' styles={button} onPress={printHTML} />
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