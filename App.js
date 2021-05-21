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

const App = () => {

  return (
      <View style={{flex: 1}}>
        <StatusBar
          animated={true}
          backgroundColor='#00A03E'
          barStyle='light-content'
          showHideTransition='fade'
        />
        <AppNavContainer />
      </View>
  );
};

export default App;
