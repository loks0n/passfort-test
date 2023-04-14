import { useQuery } from 'react-query';

import { useParams } from 'react-router-dom';
import Article from '../components/article/Article';

type PageResponse = {
  title: string;
  data: string;
};

export async function fetchPageRevision(pageTitle: string, timestamp: string) {
  const res = await fetch(
    `${import.meta.env.VITE_PAGES_API}/page/${pageTitle}/${timestamp}`
  );

  if (res.status === 404) {
    throw new Error(`Page '${pageTitle}/${timestamp}' not found`);
  }

  if (!res.ok) {
    throw new Error(`Failed to get page '${pageTitle}/${timestamp}'.`);
  }

  return res.json() as Promise<PageResponse>;
}

export default function Home() {
  const { pageTitle, timestamp } = useParams();

  if (!pageTitle || !timestamp) {
    return (
      <p>
        Page '{pageTitle}/{timestamp}' not found!
      </p>
    );
  }

  const { isLoading, error, data } = useQuery<PageResponse, Error>({
    queryKey: ['page_revision', pageTitle, timestamp],
    queryFn: async () => await fetchPageRevision(pageTitle, timestamp),
    retry: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <Article title={data!.title} data={data!.data} />;
}
