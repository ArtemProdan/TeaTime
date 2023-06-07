import React, { useState, useEffect } from 'react';
import s from './News.module.css';
// import axios from 'axios';


const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {

        // axios.get('https://official-joke-api.appspot.com/random_joke',
            //         {
            //   headers: {
            //     'accept': 'application/json',
            //     'X-CSRF-TOKEN': 'E1u1IbZA9I7oKV44liHtUou3Ni04i1N3KZAdXo3X'
            //   }
            // }
        // )
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

           

        // Внутри useEffect мы будем делать запрос к серверу и обновлять состояние компоненты
        const fetchNews = async () => {
            try {
                const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.yahoo.com/rss/');
                // const response = await fetch('http://www.boredapi.com/api/activity?key=5881028');
                // a83214850ec64451ac5f353a8cb8b38e
                const data = await response.json();
                setNews(data.items);
                console.log(data.items); // выводим данные в консоль
            } catch (error) {
                console.error(error);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className={s.news} >
            {news.map((item) => (
                <div className={s.news_container} key={item.guid}>
                    {/* <img className={s.background_image} src={item.enclosure.link} alt='' /> */}
                    <div className={s.news_info}>
                        <a href={item.link} className={s.news_link} target="_blank" rel="noreferrer">
                            {item.title}
                        </a>
                        <p>{item.pubDate}</p>
                    </div>
                    <img title="News article" src={item.enclosure.link} className={s.news_iframe} alt='' />
                </div>
            ))}
        </div>
    );
};

export default News;
