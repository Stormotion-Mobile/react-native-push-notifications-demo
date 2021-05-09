import {useCallback, useMemo} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import PushNotification, {
  PushNotificationPermissions,
} from 'react-native-push-notification';
import {getSavedDeviceTokenState} from '../utils/deviceToken';
import useDeviceToken from './useDeviceToken';

const checkPermissionsAsync = () =>
  new Promise<PushNotificationPermissions>(resolve => {
    PushNotification.checkPermissions(permissions => resolve(permissions));
  });

const usePushNotifications = () => {
  const {registerDeviceToken, unregisterDeviceToken} = useDeviceToken();

  const checkPermissionsGranted = useCallback<
    (permissions: PushNotificationPermissions) => boolean
  >(permissions => {
    const values = Object.values(permissions) as boolean[];

    const granted = values.includes(true);

    return granted;
  }, []);

  const permissionsGranted = useMemo(async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    const permissions = await checkPermissionsAsync();

    const granted = checkPermissionsGranted(permissions);

    return granted;
  }, [checkPermissionsGranted]);

  const checkCanSendNotifications = useCallback(async () => {
    const granted = await permissionsGranted;

    if (granted) {
      return true;
    }

    const permissions = await PushNotification.requestPermissions();
    const updatedGrant = checkPermissionsGranted(permissions);

    return updatedGrant;
  }, [checkPermissionsGranted, permissionsGranted]);

  const activateNotifications = useCallback(async () => {
    //To get the token definitely on iOS we need to request permissions
    Platform.OS === 'ios' && (await PushNotification.requestPermissions());

    const savedToken = await getSavedDeviceTokenState();
    savedToken && registerDeviceToken(savedToken.newToken);
  }, [registerDeviceToken]);

  const showPermissionAlert = useCallback(
    () =>
      Alert.alert(
        'Permissions denied',
        'Sorry, we need the permissions to send you the notifications. You can configure it in the Settings',
        [
          {
            text: 'OK',
            style: 'default',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
            style: 'default',
          },
        ],
        {cancelable: false},
      ),
    [],
  );

  const enableNotifications = useCallback(async () => {
    const canSendNotifications = await checkCanSendNotifications();

    if (!canSendNotifications) {
      Platform.OS === 'ios' && showPermissionAlert();
      return;
    }

    activateNotifications();
  }, [activateNotifications, checkCanSendNotifications, showPermissionAlert]);

  const disableNotifications = useCallback(async () => {
    const savedToken = await getSavedDeviceTokenState();

    savedToken?.actualTokenId &&
      unregisterDeviceToken(savedToken.actualTokenId);
  }, [unregisterDeviceToken]);

  const syncNotifications = useCallback(async () => {
    const granted = await permissionsGranted;

    if (!granted) {
      disableNotifications();
      return;
    }

    Platform.OS === 'ios' && (await PushNotification.requestPermissions());

    const savedToken = await getSavedDeviceTokenState();
    const {newToken, actualToken} = savedToken ?? {};

    if (!savedToken || newToken === actualToken) {
      return;
    }

    newToken && registerDeviceToken(newToken);
  }, [permissionsGranted, registerDeviceToken, disableNotifications]);

  return {
    disableNotifications,
    enableNotifications,
    syncNotifications,
  };
};

export default usePushNotifications;
