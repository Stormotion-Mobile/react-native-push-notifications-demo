import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  configurePushNotifications as configurePushNotificationsSetup,
  PushNotificationInitializeProps,
} from '@stormotion/react-native-push-notifications-setup';
import {
  ChannelObject,
  PushNotificationOptions,
} from 'react-native-push-notification';
import * as NavigationKeys from '../navigation/NavigationKeys';
import {navigate} from './navigation';

const channelsMainInformation: ChannelObject[] = [
  {channelId: 'tech', channelName: 'Tech'},
  {channelId: 'development', channelName: 'Development'},
];

export const channels: ChannelObject[] = channelsMainInformation.map(
  channelInfo => ({
    importance: 5,
    soundName: 'default',
    vibrate: true,
    ...channelInfo,
  }),
);

const openNotification = (
  //The type of a parameter in PushNotificationOptions['onNotification'] is changing
  //from version to version. This declaration guarantees the correct type.
  notification: Parameters<
    NonNullable<PushNotificationOptions['onNotification']>
  >[0],
) => {
  __DEV__ && console.log('Notification', notification);

  if (notification.userInteraction === false) {
    return;
  }

  navigate(NavigationKeys.Article, {id: notification.data.articleId});

  notification.finish(PushNotificationIOS.FetchResult.NoData);
};

export const options: PushNotificationOptions = {
  onNotification: openNotification,
};

export const initializeProps: PushNotificationInitializeProps = {
  onNotification: openNotification,
  removeAllDeliveredNotifications: true,
};

export const configurePushNotifications = () =>
  configurePushNotificationsSetup(options, channels);
