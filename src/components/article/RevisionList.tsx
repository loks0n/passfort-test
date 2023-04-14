import { useQuery } from 'react-query';

type Props = {
  title: string;
};

type PageRevisionsResponse = {
  revisions: Record<number, number>;
};

export async function fetchPageRevisions(pageTitle: string) {
  const res = await fetch(
    `${import.meta.env.VITE_PAGES_API}/page/${pageTitle}`
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch page revsions '${pageTitle}'  from pages API`
    );
  }

  return res.json() as Promise<PageRevisionsResponse>;
}

export default function RevisionList({ title }: Props) {
  const { isLoading, error, data } = useQuery<PageRevisionsResponse, Error>(
    ['page_revisions', title],
    async () => await fetchPageRevisions(title)
  );

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error.message}</p>
  ) : (
    <ul data-testid="page-revision-list">
      {Object.entries(data!.revisions).map(([revision]) => (
        <li key={revision} data-testid="page-revision-link">
          Revision #{revision}
        </li>
      ))}
    </ul>
  );
}
