import {news, users} from './db';
import moment from "moment/moment";

const getNews = (id) => {
    const newsForUser = [...news].filter( newsItem => {
        const userNewsAuthor = users.find(user => user.id === newsItem.userId);
        newsItem.author = userNewsAuthor.username;
        newsItem.avatar = userNewsAuthor.avatar;
        newsItem.dateFormated = moment(newsItem.date).format('HH:MM');
        const currentUserOrganisation = users.find(user => user.id === id).organisation;
        return userNewsAuthor.organisation === currentUserOrganisation;
    });
    console.log(newsForUser);
    return newsForUser
};

export {
    getNews,
}

