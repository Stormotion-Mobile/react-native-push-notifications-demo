import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BORDER_RADIUS_SMALL} from '../utils/constants';
import {Article} from '../utils/types';
import Cover from './Cover';
import CoverContent from './CoverContent';

interface Props {
  article: Article;
  onPress: (id: string) => void;
}

const ArticleCard: React.FC<Props> = ({article, onPress}) => {
  const {cover, id, title, shortContent} = article;

  const openArticle = useCallback(() => onPress(id), [id, onPress]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openArticle}>
        <Cover image={cover} rounded={true}>
          <CoverContent title={title} />
        </Cover>

        <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
          {shortContent}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS_SMALL,
    shadowColor: '#000',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    margin: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 24,
    color: '#808080',
    padding: 10,
  },
});

export default React.memo(ArticleCard);
