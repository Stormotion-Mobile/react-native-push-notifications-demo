import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {sentenceCase} from 'change-case';
import {Platform} from 'react-native';
import PushNotification, {
  PushNotificationOptions,
} from 'react-native-push-notification';
import * as NavigationKeys from '../navigation/NavigationKeys';
import {registerToken} from './deviceToken';
import {navigate} from './navigation';

enum NotificationCategory {
  TECH = 'tech',
  DEVELOPMENT = 'development',
}

const openNotification = (
  //The type of a parameter in PushNotificationOptions['onNotification'] is changing
  //from version to version. This declaration guarantees the correct type.
  notification: Parameters<
    NonNullable<PushNotificationOptions['onNotification']>
  >[0],
) => {
  console.log('Notification', notification);

  if (notification.userInteraction === false) {
    return;
  }

  navigate(NavigationKeys.Article, {id: notification.data.articleId});

  notification.finish(PushNotificationIOS.FetchResult.NoData);
};

export const options: PushNotificationOptions = {
  onRegister: async ({token}) => await registerToken(token),

  onNotification: openNotification,

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

export const initNotifications = () => {
  PushNotification.popInitialNotification(notification => {
    notification && openNotification(notification);
  });

  PushNotification.removeAllDeliveredNotifications();
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
