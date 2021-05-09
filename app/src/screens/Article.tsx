import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Cover from '../components/Cover';
import CoverContent, {CoverContentProps} from '../components/CoverContent';
import ErrorComponent from '../components/ErrorComponent';
import LoadingSpinner from '../components/LoadingSpinner';
import Markdown from '../components/Markdown';
import useQuery from '../hooks/useQuery';
import * as NavigationKeys from '../navigation/NavigationKeys';
import {RootNavigatorParamList} from '../navigation/RootNavigator';
import {ASPECT_RATIO} from '../utils/constants';
import {Article as ArticleType} from '../utils/types';

type ScreenProps = StackScreenProps<
  RootNavigatorParamList,
  typeof NavigationKeys.Article
>;

const Article: React.FC<ScreenProps> = ({
  route: {
    params: {id: articleId},
  },
}) => {
  const {data, error, loading} = useQuery<ArticleType>('article', {articleId});

  const {cover, title, content} = data ?? {title: '', content: ''};

  const {width} = useWindowDimensions();

  const [coverHeight, setCoverHeight] = useState(width * ASPECT_RATIO);

  const {setOptions} = useNavigation();

  const {bottom} = useSafeAreaInsets();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = useMemo(() => Animated.divide(scrollY, -2), [
    scrollY,
  ]);

  const animatedViewStyle = useMemo<Animated.WithAnimatedObject<ViewStyle>>(
    () => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      transform: [{translateY: headerTranslate}],
    }),
    [headerTranslate],
  );

  const coverContentStyle = useMemo<NonNullable<CoverContentProps['style']>>(
    () => ({
      view: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {textAlign: 'center'},
    }),
    [],
  );

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({paddingBottom: bottom, paddingTop: coverHeight}),
    [bottom, coverHeight],
  );

  const scrollHandler = useMemo(
    () =>
      Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      }),
    [scrollY],
  );

  const saveCoverHeight = useCallback<NonNullable<ViewProps['onLayout']>>(
    ({
      nativeEvent: {
        layout: {height},
      },
    }) => setCoverHeight(height),
    [],
  );

  useEffect(() => {
    setOptions({headerTitle: data?.title});
  }, [data?.title, setOptions]);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading || !data) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={animatedViewStyle} onLayout={saveCoverHeight}>
        <Cover image={cover} rounded={false}>
          <CoverContent title={title} style={coverContentStyle} />
        </Cover>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={contentContainerStyle}>
        <View style={styles.content}>
          <Markdown>{content}</Markdown>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 10,
    backgroundColor: 'white',
  },
});

export default React.memo(Article);
