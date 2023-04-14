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

  if (res.status === 404) {
    throw new Error(`Page '${pageTitle}' not found`);
  }

  if (!res.ok) {
    throw new Error(`Oops, something went wrong.`);
  }

  return res.json() as Promise<PageResponse>;
}

export default function Home() {
  const { pageTitle } = useParams();

  if (!pageTitle) {
    return <p>Page '{pageTitle}' not found!</p>;
  }

  const { isLoading, error, data } = useQuery<PageResponse, Error>({
    queryKey: ['page_latest', pageTitle],
    queryFn: async () => await fetchPageLatest(pageTitle!),
    retry: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <Article title={data!.title} data={data!.data} editable />;
}
