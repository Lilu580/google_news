'use client';

import axios from 'axios';
import cheerio from 'cheerio';
import { useEffect, useState } from 'react';
import NewsCard from './components/news_card';
import SearchInput from './components/SearchInput';

import { SearchResult } from './types/SearchResult';

export default function Home() {
  const [news, setNews] = useState<SearchResult[]>([])
  const [query, setQuery] = useState('war');

  const searchGoogleNews = async (query: string) => {
    const apiKey = 'AIzaSyDRMmI3f1Ql3u0ctC7kwhORDITznZBcvOg';
    const cx = 'b0f43e8a7306e422c';
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}`;
    let result 
  
    try {
      const { data } = await axios.get(url);
      result = data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
      }));
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    } finally {
      setNews(result)
    }
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        searchGoogleNews(query);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query])

  console.log(news)
    return (
      <div className="container">
        <SearchInput query={query} handleQuery={setQuery}/>
        {news.map(el => (
          <NewsCard key={el.link} {...el}></NewsCard>
        ))}
      </div>
    ) 
}
