import {mockedArticles} from './mocked';

const API_URL = 'http://localhost:4000';
const ARTICLES_ENDPOINT = 'articles';
const DEVICE_TOKENS_ENDPOINT = 'tokens';

const request = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
) => {
  try {
    const response = await fetch(url, {
      headers: {'Content-Type': 'application/json'},
      method,
      body,
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log('ERROR ON REQUEST', error);
    return error;
  }
};

// export const getArticles = async () => await request(`${API_URL}/${ARTICLES_ENDPOINT}`);

// export const getArticle = async (articleId: string) =>
//   await request(`${API_URL}/${ARTICLES_ENDPOINT}/${articleId}`);

export const getArticles = async () => mockedArticles;

export const getArticle = async (articleId: string) =>
  mockedArticles.find(article => article.id === articleId);

export const saveDeviceToken = async (deviceId: string, token: string) =>
  await request(`${API_URL}/${DEVICE_TOKENS_ENDPOINT}`, 'POST', {
    token,
    deviceId,
  });

export const deleteDeviceToken = async (id: string) =>
  await request(`${API_URL}/${DEVICE_TOKENS_ENDPOINT}`, 'DELETE', {id});
