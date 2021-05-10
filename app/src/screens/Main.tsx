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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ArticleCard from '../components/ArticleCard';
import EmptyList from '../components/EmptyList';
import ErrorComponent from '../components/ErrorComponent';
import LoadingSpinner from '../components/LoadingSpinner';
import usePushNotifications from '../hooks/usePushNotifications';
import useQuery from '../hooks/useQuery';
import * as NavigationKeys from '../navigation/NavigationKeys';
import {RootNavigatorParamList} from '../navigation/RootNavigator';
import {Article} from '../utils/types';

type ScreenProps = StackScreenProps<
  RootNavigatorParamList,
  typeof NavigationKeys.Article
>;

const Main: React.FC<ScreenProps> = ({navigation}) => {
  const {data, error, loading} = useQuery('articles');

  const articles = data?.articles ? (data.articles as Article[]) : [];

  const {bottom} = useSafeAreaInsets();

  const {enableNotifications} = usePushNotifications();

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
    const enableNotificationsAsync = async () => await enableNotifications();

    enableNotificationsAsync().catch(err =>
      console.log('Error on enabling notifications', err),
    );
  }, [enableNotifications]);

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
