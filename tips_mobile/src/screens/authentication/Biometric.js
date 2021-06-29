import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
  StyleSheet,
} from 'react-native';
 
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { useDispatch } from 'react-redux';
import { pinAuthenticationSuccess } from '../../redux/actions';
 
 
// - this example component supports both the
//   legacy device-specific (Android < v23) and
//   current (Android >= 23) biometric APIs
// - your lib and implementation may not need both
const BiometricPopup = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        errorMessageLegacy: null,
        biometricLegacy: null,
        biometryType: null
    });

    const requiresLegacyAuthentication = () => Platform.Version < 23;

    const getMessage = () =>{
        const {biometryType}=state;
        console.log(biometryType);
        if(biometryType == 'Face ID')
        {
            return 'Scan your Face on the device to continue'
        }
        else
        {
            return 'Scan your Fingerprint on the device scanner to continue'
        }
    };
 
    const authCurrent = () => {
        FingerprintScanner
            .authenticate({ description: getMessage(), title: 'Отсканируйте, чтобы войти', cancelButton: 'Ввести ПИН-код' })
            .then(() => {
                dispatch(pinAuthenticationSuccess());
            })
            .catch((e) => console.log(e));
    };
 
    const authLegacy = () => {
        FingerprintScanner
            .authenticate({ onAttempt: handleAuthenticationAttemptedLegacy })
            .then(() => {
                props.handlePopupDismissedLegacy();
                Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
            })
            .catch((error) => {
                setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
            });
    }
 
    const handleAuthenticationAttemptedLegacy = (error) => setState({ errorMessageLegacy: error.message });

    useEffect(() => {
        if (requiresLegacyAuthentication()) {
            authLegacy();
        } else {
            FingerprintScanner.isSensorAvailable()
                .then((biometryType) => {
                    this.setState({biometryType});
                })
            authCurrent();
        }
    }, []);

    useEffect(() => {
        return FingerprintScanner.release;
    })
 
    const { errorMessageLegacy, biometricLegacy } = state;

    return false
};
 
BiometricPopup.propTypes = {
  handlePopupDismissedLegacy: PropTypes.func,
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 164, 222, 0.9)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    logo: {
      marginVertical: 45,
    },
    heading: {
      textAlign: 'center',
      color: '#00a4de',
      fontSize: 21,
    },
    description: (error) => ({
      textAlign: 'center',
      color: error ? '#ea3d13' : '#a5a5a5',
      height: 65,
      fontSize: 18,
      marginVertical: 10,
      marginHorizontal: 20,
    }),
    buttonContainer: {
      padding: 20,
    },
    buttonText: {
      color: '#8fbc5a',
      fontSize: 15,
      fontWeight: 'bold',
    },
})
 
export default BiometricPopup;