import React from 'react';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {StatusBar, View,} from 'react-native';
import AppNavContainer from "./src/navigations";

const App = () => {

    return (
        <Provider store={store}>
            <View style={{flex: 1}}>
                <StatusBar
                    animated={true}
                    backgroundColor='#00A03E'
                    barStyle='light-content'
                    showHideTransition='fade'
                />
                <AppNavContainer/>
            </View>
        </Provider>
    );
};

export default App;
