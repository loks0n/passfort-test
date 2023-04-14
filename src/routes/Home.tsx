import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

type PageData = {
  titles: string[];
};

export async function fetchPages() {
  const res = await fetch(`${import.meta.env.VITE_PAGES_API}/pages`);

  if (!res.ok) {
    throw new Error('Unable to fetch data from pages API');
  }

  return res.json() as Promise<PageData>;
}

export default function Home() {
  const { error, isLoading, data } = useQuery<PageData, Error>(
    'all_pages',
    fetchPages
  );

  return (
    <article>
      <header>
        <h1>All Pages</h1>
      </header>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <ul data-testid="page-link-list">
          {data?.titles.map((title) => (
            <li key={title}>
              <Link to={`/page/${title}`} data-testid="page-link">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
