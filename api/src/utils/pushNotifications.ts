import NodePushNotifications, {
  Data,
  RegistrationId,
} from 'node-pushnotifications';
import {
  APNTokenKey,
  APNTokenKeyId,
  appleTeamId,
  firebaseServerKey,
  nodeEnv,
} from './env';

export enum NotificationType {
  TECH = 'tech',
  DEVELOPMENT = 'development',
}

// Replace it with your application Bundle ID (iOS) (the package name in Android)
const APP_BUNDLE_ID = 'com.stormotion.pushnotificationsdemo';

class PushNotifications extends NodePushNotifications {
  private static instance: PushNotifications;

  private constructor() {
    super({
      gcm: {
        id: firebaseServerKey,
      },
      apn: {
        token: {
          key: Buffer.from(APNTokenKey, 'base64').toString(),
          keyId: APNTokenKeyId,
          teamId: appleTeamId,
        },
        production: nodeEnv === 'production',
      },
      isAlwaysUseFCM: false,
    });
  }

  public static getInstance(): PushNotifications {
    if (!PushNotifications.instance) {
      PushNotifications.instance = new PushNotifications();
    }

    return PushNotifications.instance;
  }
}

export type NotificationMessage = Pick<
  Data,
  'title' | 'body' | 'priority' | 'badge' | 'alert' | 'custom'
> & {
  android_channel_id?: string;
  silent?: boolean;
  threadId?: string;
  pushType?: 'alert' | 'background';
};

const getMessage = ({
  title,
  body,
  priority = 'high',
  badge,
  android_channel_id,
  silent = false,
  pushType = 'alert',
  threadId,
  custom,
}: NotificationMessage): Data => ({
  title,
  topic: APP_BUNDLE_ID,
  body,
  custom,
  icon: 'ic_notification',
  priority,
  contentAvailable: true,
  delayWhileIdle: true,
  restrictedPackageName: APP_BUNDLE_ID,
  dryRun: false,
  retries: 1,
  badge,
  sound: 'default',
  //@ts-expect-error Defective type
  android_channel_id,
  alert: {
    title,
    body,
  },
  silent,
  truncateAtWordEnd: true,
  mutableContent: 0,
  threadId,
  pushType,
});

export const sendNotification = async (
  tokens: RegistrationId | RegistrationId[],
  type: NotificationType,
  messageTitle?: string,
  messageBody?: string,
  custom?: any,
) => {
  try {
    const defaultText = {
      title: 'New article is out!',
      body: 'Open to get more details',
    };

    const data = getMessage({
      title: messageTitle ?? defaultText.title,
      body: messageBody ?? defaultText.body,
      android_channel_id: type,
      threadId: type,
      custom: {
        category: type,
        ...custom,
      },
    });

    const results = await PushNotifications.getInstance().send(tokens, data);
    console.log(results);
  } catch (error) {
    console.error('Error while sending notifications:', error);
  }
};
