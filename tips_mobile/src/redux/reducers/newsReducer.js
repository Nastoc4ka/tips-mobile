import { NEWS_REMOVED, NEWS_CREATED, NEWS_UPDATED, NEWS_FETCHED } from '../actions/types';

const initialState = {
  news: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_FETCHED:
      return {
        news: action.payload,
      };
    case NEWS_UPDATED:
      const news = action.payload;
      const idx = state.news.findIndex((item) => item.id === news.id);
      return {
        news: [...state.news.slice(0, idx), news, ...state.news.slice(idx + 1)],
      };
    case NEWS_CREATED:
      const newsFiltered = [...state.news, action.payload].filter((a, b) => b.date - a.date);
      return {
        news: newsFiltered,
      };
    case NEWS_REMOVED:
      const idNewsItem = action.payload;
      const updatedNewsList = state.news.filter((item) => item.id !== idNewsItem);
      return {
        news: updatedNewsList,
      };
    default:
      return state;
  }
};

export default newsReducer;
