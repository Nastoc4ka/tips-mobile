import { NewsError } from '../errors';
import authHeader from './authHeader';
import { catchError, client } from './client';

const createNews = async (newsItem) => {
  return client
    .post(`/news`, { ...newsItem }, { headers: await authHeader() })
    .then(({ data }) => data)
    .catch(catchError(NewsError));
};

const updateNews = async (newsItem) => {
  return client
    .put(`/news`, { ...newsItem }, { headers: await authHeader() })
    .then(({ data }) => data)
    .catch(catchError(NewsError));
};

const removeNews = async (id) => {
  return client
    .delete(`/news?id=${id}`, { headers: await authHeader() })
    .then(({ data }) => data)
    .catch(catchError(NewsError));
};

const getNews = async () => {
  return client
    .get(`/news`, { headers: await authHeader() })
    .then(({ data }) => data)
    .catch(catchError(NewsError));
};

export { createNews, getNews, removeNews, updateNews };
