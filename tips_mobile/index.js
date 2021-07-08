/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import ExampleApp from './Example';
import {name as appName} from './app.json';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => App);
