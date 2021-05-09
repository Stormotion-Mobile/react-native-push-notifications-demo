import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import {
  rootNavigationRef,
  setRootNavigationReady,
} from './src/utils/navigation';

const App = () => {
  const setNavigationReady = useCallback(
    () => setRootNavigationReady(true),
    [],
  );

  useEffect(() => {
    return () => setRootNavigationReady(false);
  }, []);

  return (
    <NavigationContainer ref={rootNavigationRef} onReady={setNavigationReady}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
