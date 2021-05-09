import React, {PropsWithChildren, useMemo} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import RNMarkdown from 'react-native-markdown-display';

type Props = PropsWithChildren<ViewStyle>;

const Markdown: React.FC<Props> = ({children, ...props}) => {
  const regularText = useMemo<TextStyle>(
    () => ({
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 21,
      color: 'black',
    }),
    [],
  );

  const markdownStyle = useMemo<StyleSheet.NamedStyles<any>>(
    () => ({
      body: regularText,
      paragraph: {
        marginTop: 0,
        marginBottom: 8,
      },
      heading1: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 28,
        lineHeight: 42,
        color: 'black',
        paddingBottom: 12,
        paddingTop: 8,
      },
      heading2: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
        paddingBottom: 8,
        paddingTop: 4,
      },
      ordered_list_icon: {...regularText, marginTop: 0},
      bullet_list_icon: {...regularText, marginTop: 0, fontWeight: '700'},
      list_item: {...regularText},
      blockquote: {
        backgroundColor: undefined,
        ...regularText,
        fontStyle: 'italic',
      },
    }),
    [regularText],
  );

  return (
    <View {...props}>
      <RNMarkdown style={markdownStyle}>{children}</RNMarkdown>
    </View>
  );
};

export default React.memo(Markdown);
