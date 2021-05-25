import {news, users} from './db';
import moment from "moment/moment";

const getNews = (id) => {
    return [...news].filter( (newsItem, i) => {
        const userNewsAuthor = users.find((user) => user.id === newsItem.userId);
        newsItem.author = `${userNewsAuthor.firstName} ${userNewsAuthor.firstName}`;
        newsItem.avatar = userNewsAuthor.avatar;
        newsItem.key = i;
        newsItem.dateFormated = moment(newsItem.date).format('HH:MM');
        const currentUserOrganisation = users.find(user => user.id === id).organisation;
        return userNewsAuthor.organisation === currentUserOrganisation;
    });
};

const getUser = (id) => {
    return users.find(user => user.id === id)
};

const toggleImportantNews = (id) => {
    const index = news.findIndex((item) => item.id === id);
    news[index].important = !news[index].important;
    return users.find(user => user.id === id)
};

// const reactOnNews = (id) => {
//     return users.find(user => user.id === id)
// };

export {
    getNews,
    getUser,
    toggleImportantNews,
}

