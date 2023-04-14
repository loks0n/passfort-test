import { useQuery } from 'react-query';

import { useParams } from 'react-router-dom';
import EditableArticlePage from '../components/article/EditableArticle';

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

  const latestPage = useQuery<PageResponse, Error>(
    ['page_latest', pageTitle],
    async () => await fetchPageLatest(pageTitle!)
  );

  return latestPage.isLoading ? (
    <p>Loading...</p>
  ) : latestPage.error ? (
    <p>{latestPage.error.message}</p>
  ) : (
    <EditableArticlePage
      title={latestPage.data!.title}
      data={latestPage.data!.data}
    />
  );
}
