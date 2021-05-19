import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppNavContainer from "./src/navigations";
import { styleBackground } from './src/styles';

const App = () => {

  return (
      <SafeAreaView style={{flex: 1}}>
          <AppNavContainer />
      </SafeAreaView>
  );
};

export default App;
