import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import {getNews} from '../../services/serviceQueries';
import {NewsItem} from '../../components';


const News =({id}) => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        setNews(getNews(id));
    }, []);
    return (
            <>
                {news.length ? news.map(newsItem => {
                    return <NewsItem newsItem={newsItem} key={newsItem.id}/>
                }): null}
            </>
    );
};

export default News