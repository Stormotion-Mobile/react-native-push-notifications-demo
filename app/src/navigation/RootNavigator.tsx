import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {useInitNotifications} from '@stormotion/react-native-push-notifications-setup';
import React, {useMemo} from 'react';
import Header from '../components/Header';
import ArticleScreen from '../screens/Article';
import MainScreen from '../screens/Main';
import {deviceTokenAPIRequests} from '../utils/api';
import {initializeProps} from '../utils/pushNotifications';
import {Article} from '../utils/types';
import * as NavigationKeys from './NavigationKeys';

export type RootNavigatorParamList = {
  [NavigationKeys.Main]: undefined;
  [NavigationKeys.Article]: {id: Article['id']};
};

const Stack = createStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => {
  useInitNotifications(initializeProps, deviceTokenAPIRequests);

  const commonScreenOptions = useMemo<StackNavigationOptions>(
    () => ({headerStyle: {backgroundColor: '#fff'}}),
    [],
  );

  const mainScreenOptions = useMemo<StackNavigationOptions>(
    () => ({headerTitle: () => <Header />}),
    [],
  );

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
