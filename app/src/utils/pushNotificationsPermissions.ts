import {Platform} from 'react-native';
import PushNotification, {
  PushNotificationPermissions,
} from 'react-native-push-notification';

const checkPermissionsAsync = () =>
  new Promise<PushNotificationPermissions>(resolve => {
    PushNotification.checkPermissions(permissions => resolve(permissions));
  });

const checkPermissionsGranted = (permissions: PushNotificationPermissions) => {
  const values = Object.values(permissions) as boolean[];

  const granted = values.includes(true);

  return granted;
};

export const arePermissionsGranted = async () => {
  if (Platform.OS === 'android') {
    return true;
  }

  const permissions = await checkPermissionsAsync();

  const granted = checkPermissionsGranted(permissions);

  return granted;
};

export const checkCanSendNotifications = async () => {
  const granted = await arePermissionsGranted();

  if (granted) {
    return true;
  }

  const permissions = await PushNotification.requestPermissions();
  const updatedGrant = checkPermissionsGranted(permissions);

  return updatedGrant;
};
