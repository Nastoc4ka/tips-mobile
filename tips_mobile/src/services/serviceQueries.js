import { news, users } from './db';
import moment from 'moment/moment';

const getNews = (id) => {
  return [...news].filter((newsItem, i) => {
    const userNewsAuthor = users.find((user) => user.id === newsItem.userId);
    newsItem.author = `${userNewsAuthor.firstName} ${userNewsAuthor.firstName}`;
    newsItem.avatar = userNewsAuthor.avatar;
    newsItem.key = i;
    newsItem.dateFormated = moment(newsItem.date).format('HH:MM');
    const currentUserOrganization = users.find((user) => user.id === id).organization;
    return userNewsAuthor.organization === currentUserOrganization;
  });
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const toggleImportantNews = (id) => {
  const el = news.find((item) => item.id === id);
  console.log(el);
  if (el.important) {
    dis;
  }
};

// const reactOnNews = (id) => {
//     return users.find(user => user.id === id)
// };

export { getNews, getUser, toggleImportantNews };
