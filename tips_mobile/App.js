import React from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import AppNavContainer from "./src/navigations";
import store from './src/redux/store';

const App = () => {

  return (
    <Provider store={store}>
        <View style={{flex: 1}}>
          <AppNavContainer />
        </View>
    </Provider>
  );
};

export default App;
