import AsyncStorage from '@react-native-async-storage/async-storage';

export const DEVICE_TOKEN_KEY = 'deviceToken';

export type DeviceTokenState = {
  newToken: string;
  actualToken?: string;
  actualTokenId?: string;
};

export const saveDeviceTokenState = async (tokenState: DeviceTokenState) => {
  try {
    await AsyncStorage.setItem(DEVICE_TOKEN_KEY, JSON.stringify(tokenState));
  } catch (error) {
    console.log('Setting device token error', error);
  }
};

export const getSavedDeviceTokenState = async () => {
  try {
    const tokenStateAsString = await AsyncStorage.getItem(DEVICE_TOKEN_KEY);

    const tokenState = tokenStateAsString
      ? JSON.parse(tokenStateAsString)
      : null;

    return tokenState;
  } catch (error) {
    console.log('Getting device token error', error);
  }
};

export const removeActualDeviceTokenState = async () => {
  try {
    const tokenState = await getSavedDeviceTokenState();

    tokenState && saveDeviceTokenState({newToken: tokenState.newToken});
  } catch (error) {
    console.log('Removing actual device token error', error);
  }
};

export const registerToken = async (token: string) => {
  try {
    console.log('Device token on registration', token);
    const savedTokenState = await getSavedDeviceTokenState();

    if (!savedTokenState) {
      const newTokenState = {newToken: token};
      saveDeviceTokenState(newTokenState);
      return;
    }

    if (token === savedTokenState.actualToken) {
      return;
    }

    const newTokenState: DeviceTokenState = {
      ...savedTokenState,
      newToken: token,
    };

    saveDeviceTokenState(newTokenState);
  } catch (error) {
    console.log('Registering device token error', error);
  }
};
