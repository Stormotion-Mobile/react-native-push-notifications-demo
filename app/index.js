import {AppRegistry} from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';
import {options} from './src/utils/pushNotifications';

PushNotification.configure(options);

AppRegistry.registerComponent(appName, () => App);
