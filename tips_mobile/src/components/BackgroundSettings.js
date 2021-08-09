import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Blur, Loading } from '../components';

const BackgroundSettings = ({ children }) => {
  return (
    <View style={styleSettingsScreens.topPanel}>
      <View style={styleSettingsScreens.container}>
        {children}
        <Blur />
        <Loading />
      </View>
    </View>
  );
};

export default BackgroundSettings;

const styleSettingsScreens = StyleSheet.create({
  topPanel: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(249, 249, 249, 0.9)',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
});
