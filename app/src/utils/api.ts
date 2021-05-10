// To connect API on a physical device, specify the IP address
// e.g. 'http://192.168.0.100:4000'
// You can find it in the computer settings.
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
      body: JSON.stringify(body),
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log('ERROR ON REQUEST', error);
    return error;
  }
};

export const getArticles = async () =>
  await request(`${API_URL}/${ARTICLES_ENDPOINT}`);

export const getArticle = async (articleId: string) =>
  await request(`${API_URL}/${ARTICLES_ENDPOINT}/${articleId}`);

export const saveDeviceToken = async (deviceId: string, token: string) =>
  await request(`${API_URL}/${DEVICE_TOKENS_ENDPOINT}`, 'POST', {
    token,
    deviceId,
  });

export const deleteDeviceToken = async (id: string) =>
  await request(`${API_URL}/${DEVICE_TOKENS_ENDPOINT}/${id}`, 'DELETE');
