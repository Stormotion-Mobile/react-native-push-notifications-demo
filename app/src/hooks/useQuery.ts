import {useEffect, useMemo, useState} from 'react';
import {getArticle, getArticles} from '../utils/api';

type QueryType = 'articles' | 'article';

const useQuery = (type: QueryType, options?: {articleId: string}) => {
  const [data, setData] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const isArticleType = type === 'article';

  const articleId = useMemo(() => options?.articleId, [options?.articleId]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (isArticleType && !articleId) {
          throw new Error('No articleId specified');
        }

        const response = isArticleType
          ? await getArticle(articleId!)
          : await getArticles();

        setData(response);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [isArticleType, articleId]);

  return {data, loading, error};
};

export default useQuery;
