import {useEffect, useRef} from 'react';
import {initNotifications} from '../utils/pushNotifications';
import usePushNotifications from './usePushNotifications';

const useInitNotifications = () => {
  const {syncNotifications} = usePushNotifications();

  //To prevent calling syncNotifications function several times
  const firstLoaded = useRef(true);

  useEffect(() => {
    if (!firstLoaded.current) {
      return;
    }

    (async () => await syncNotifications())();
    firstLoaded.current = false;
  }, [syncNotifications]);

  useEffect(() => {
    initNotifications();
  }, []);
};

export default useInitNotifications;
