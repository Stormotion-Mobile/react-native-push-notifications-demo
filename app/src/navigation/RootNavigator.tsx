import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {useEffect, useMemo, useRef} from 'react';
import Header from '../components/Header';
import usePushNotifications from '../hooks/usePushNotifications';
import ArticleScreen from '../screens/Article';
import MainScreen from '../screens/Main';
import {initNotifications} from '../utils/pushNotifications';
import {Article} from '../utils/types';
import * as NavigationKeys from './NavigationKeys';

export type RootNavigatorParamList = {
  [NavigationKeys.Main]: undefined;
  [NavigationKeys.Article]: {id: Article['id']};
};

const Stack = createStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => {
  const {syncNotifications} = usePushNotifications();

  //To prevent calling syncNotifications function several times
  const firstLoaded = useRef(true);

  const commonScreenOptions = useMemo<StackNavigationOptions>(
    () => ({headerStyle: {backgroundColor: '#fff'}}),
    [],
  );

  const mainScreenOptions = useMemo<StackNavigationOptions>(
    () => ({headerTitle: () => <Header />}),
    [],
  );

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

  return (
    <Stack.Navigator
      initialRouteName={NavigationKeys.Main}
      screenOptions={commonScreenOptions}>
      <Stack.Screen
        name={NavigationKeys.Main}
        component={MainScreen}
        options={mainScreenOptions}
      />
      <Stack.Screen name={NavigationKeys.Article} component={ArticleScreen} />
    </Stack.Navigator>
  );
};

export default React.memo(RootNavigator);
