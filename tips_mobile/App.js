import React from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import AppNavContainer from "./src/navigations";
import store from './src/redux/store';

global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}

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
