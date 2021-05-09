import {Platform} from 'react-native';
import {PushNotificationOptions} from 'react-native-push-notification';
import {registerToken} from './deviceToken';

export const options: PushNotificationOptions = {
  onRegister: async ({token}) => await registerToken(token),

  onNotification: notification => console.log('Notification', notification),

  onRegistrationError: error =>
    console.log('On push notifications registration error', error),

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: false,
  requestPermissions: Platform.OS === 'android',
};
