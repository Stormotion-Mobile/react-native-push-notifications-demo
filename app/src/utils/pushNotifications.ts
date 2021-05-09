import {sentenceCase} from 'change-case';
import {Platform} from 'react-native';
import PushNotification, {
  PushNotificationOptions,
} from 'react-native-push-notification';
import {registerToken} from './deviceToken';

enum NotificationCategory {
  TECH = 'tech',
  DEVELOPMENT = 'development',
}

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

const channelExistsAsync = (channelId: string) =>
  new Promise<boolean>(resolve => {
    PushNotification.channelExists(channelId, exists => resolve(exists));
  });

export const createNotificationsChannels = async () => {
  if (Platform.OS !== 'android') {
    return;
  }

  for (const category of Object.values(NotificationCategory)) {
    const exists = await channelExistsAsync(category);
    if (exists) {
      return;
    }

    PushNotification.createChannel(
      {
        channelId: category,
        channelName: sentenceCase(category),
        importance: 5,
        soundName: 'default',
        vibrate: true,
      },
      created => console.log(`Channel with id ${category} created:`, created),
    );
  }
};
