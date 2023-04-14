import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

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
    ['page_all_revisions', title],
    async () => await fetchPageRevisions(title)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ul data-testid="page-revision-list">
      {Object.entries(data!.revisions).map(([revision, timestamp]) => (
        <li key={revision}>
          <Link
            to={`/page/${title}/${timestamp}`}
            data-testid="page-revision-link"
          >
            Revision #{revision}
          </Link>
        </li>
      ))}
    </ul>
  );
}
