import { useQuery } from 'react-query';

import { useParams } from 'react-router-dom';
import EditableArticlePage from '../components/article/EditableArticle';

type Page = {
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

  return res.json() as Promise<Page>;
}

export default function Home() {
  const { pageTitle } = useParams();

  const { error, isLoading, data } = useQuery<Page, Error>(
    ['page', pageTitle],
    async () => await fetchPageLatest(pageTitle!)
  );

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error.message}</p>
  ) : (
    <EditableArticlePage title={data!.title} data={data!.data} />
  );
}
