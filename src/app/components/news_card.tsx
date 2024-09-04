import { SearchResult } from '../types/SearchResult';

export default function NewsCard({title, link}: SearchResult) {
    return (
        <>
            <h1>{title}</h1>
            <a href={link}>Link</a>
        </>
    ) 
}
