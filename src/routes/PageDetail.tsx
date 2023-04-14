import { useQuery } from 'react-query';

import { useParams } from 'react-router-dom';
import Article from '../components/article/Article';

type PageResponse = {
  title: string;
  data: string;
};

export async function fetchPageLatest(pageTitle: string) {
  const res = await fetch(
    `${import.meta.env.VITE_PAGES_API}/page/${pageTitle}/latest`
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch latest page '${pageTitle}'  from pages API`
    );
  }

  return res.json() as Promise<PageResponse>;
}

export default function Home() {
  const { pageTitle } = useParams();

  if (!pageTitle) {
    return <p>Page not found!</p>;
  }

  const { isLoading, error, data } = useQuery<PageResponse, Error>(
    ['page_latest', pageTitle],
    async () => await fetchPageLatest(pageTitle!)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <Article title={data!.title} data={data!.data} editable />;
}
