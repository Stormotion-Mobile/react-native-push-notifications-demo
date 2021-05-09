import {mockedArticles} from './mocked';

const API_URL = 'http://localhost:4000/articles';

const request = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {'Content-Type': 'application/json'},
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log('ERROR ON REQUEST', error);
    return error;
  }
};

// export const getArticles = async () => await request(API_URL);

// export const getArticle = async (articleId: string) =>
//   await request(`${API_URL}/${articleId}`);

export const getArticles = async () => mockedArticles;

export const getArticle = async (articleId: string) =>
  mockedArticles.find(article => article.id === articleId);
