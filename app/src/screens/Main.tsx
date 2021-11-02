import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {enableNotifications} from 'react-native-push-notifications-setup';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ArticleCard from '../components/ArticleCard';
import EmptyList from '../components/EmptyList';
import ErrorComponent from '../components/ErrorComponent';
import LoadingSpinner from '../components/LoadingSpinner';
import useQuery from '../hooks/useQuery';
import * as NavigationKeys from '../navigation/NavigationKeys';
import {RootNavigatorParamList} from '../navigation/RootNavigator';
import {deviceTokenAPIRequests} from '../utils/api';
import {Article} from '../utils/types';

type ScreenProps = StackScreenProps<
  RootNavigatorParamList,
  typeof NavigationKeys.Article
>;

const Main: React.FC<ScreenProps> = ({navigation}) => {
  const {data, error, loading} = useQuery('articles');

  const articles = data?.articles ? (data.articles as Article[]) : [];

  const {bottom} = useSafeAreaInsets();

  const emptyComponent = useMemo(() => <EmptyList />, []);

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({paddingBottom: bottom}),
    [bottom],
  );

  const openArticle = useCallback<(id: string) => void>(
    id => navigation.navigate(NavigationKeys.Article, {id}),
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Article>>(
    ({item}) => <ArticleCard article={item} onPress={openArticle} />,
    [openArticle],
  );

  const keyExtractorHandler = useCallback<
    NonNullable<FlatListProps<Article>['keyExtractor']>
  >(item => item.id, []);

  useEffect(() => {
    setTimeout(
      () =>
        enableNotifications(deviceTokenAPIRequests).catch(
          notificationsError =>
            __DEV__ &&
            console.log('Error on enabling notifications', notificationsError),
        ),
      10000,
    );
  }, []);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={keyExtractorHandler}
        ListEmptyComponent={emptyComponent}
        contentContainerStyle={contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default React.memo(Main);
