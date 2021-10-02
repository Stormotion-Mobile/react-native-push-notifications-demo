import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {configurePushNotifications} from './src/utils/pushNotifications';

configurePushNotifications();

AppRegistry.registerComponent(appName, () => App);
