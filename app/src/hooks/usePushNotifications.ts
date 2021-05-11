import {useCallback} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {getSavedDeviceTokenState} from '../utils/deviceToken';
import {
  arePermissionsGranted,
  checkCanSendNotifications,
} from '../utils/pushNotificationsPermissions';
import useDeviceToken from './useDeviceToken';

const usePushNotifications = () => {
  const {registerDeviceToken, unregisterDeviceToken} = useDeviceToken();

  const activateNotifications = useCallback(async () => {
    //To get the token definitely on iOS we need to request permissions
    Platform.OS === 'ios' && (await PushNotification.requestPermissions());

    const savedToken = await getSavedDeviceTokenState();
    const {newToken, actualToken} = savedToken ?? {};

    if (!savedToken || newToken === actualToken) {
      return;
    }

    newToken && registerDeviceToken(newToken);
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

    await activateNotifications();
  }, [activateNotifications, showPermissionAlert]);

  const disableNotifications = useCallback(async () => {
    const savedToken = await getSavedDeviceTokenState();

    savedToken?.actualTokenId &&
      unregisterDeviceToken(savedToken.actualTokenId);
  }, [unregisterDeviceToken]);

  const syncNotifications = useCallback(async () => {
    const granted = await arePermissionsGranted();

    if (!granted) {
      disableNotifications();
      return;
    }

    await activateNotifications();
  }, [activateNotifications, disableNotifications]);

  return {
    disableNotifications,
    enableNotifications,
    syncNotifications,
  };
};

export default usePushNotifications;
