import {useCallback} from 'react';
import {getUniqueId} from 'react-native-device-info';
import {deleteDeviceToken, saveDeviceToken} from '../utils/api';
import {
  DeviceTokenState,
  getSavedDeviceTokenState,
  removeActualDeviceTokenState,
  saveDeviceTokenState,
} from '../utils/deviceToken';

const useDeviceToken = () => {
  const registerDeviceToken = useCallback<(token: string) => Promise<void>>(
    async token => {
      try {
        const deviceId = getUniqueId();

        const response = await saveDeviceToken(deviceId, token);

        console.log('Register token response', response);

        const savedTokenState = await getSavedDeviceTokenState();

        const newTokenState: DeviceTokenState = {
          actualToken: token,
          actualTokenId: response.id,
          newToken: savedTokenState?.newToken ?? '',
        };

        saveDeviceTokenState(newTokenState);
      } catch (error) {
        console.log('Saving device token request error', error);
      }
    },
    [],
  );

  const unregisterDeviceToken = useCallback<(id: string) => Promise<void>>(
    async id => {
      try {
        const response = await deleteDeviceToken(id);

        console.log('Unregister token response', response);

        removeActualDeviceTokenState();
      } catch (error) {
        console.log('Deleting device token request error', error);
      }
    },
    [],
  );

  return {registerDeviceToken, unregisterDeviceToken};
};

export default useDeviceToken;
