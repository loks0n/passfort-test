import { useState } from 'react';
import { EditableArticleContent } from './EditableArticleContent';
import { useMutation, useQueryClient } from 'react-query';

type Props = {
  title: string;
  data: string;
};

async function saveContent(title: string, data: string) {
  const res = await fetch(`${import.meta.env.VITE_PAGES_API}/page/${title}`, {
    method: 'POST',
    body: JSON.stringify({ page: data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to save data for page '${title}'`);
  }
}

export default function EditableArticlePage({
  title,
  data: defaultData,
}: Props) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, error } = useMutation<void, Error, string>({
    mutationFn: (data) => saveContent(title, data),
    onSuccess: () => queryClient.invalidateQueries(['page', title]),
    onSettled: () => setIsEditing(false),
  });

  return (
    <article>
      <header>
        <h1 data-testid="page-detail-heading">{title}</h1>
      </header>
      {error && <p>Whoops! Something went wrong.</p>}
      {isEditing ? (
        <section>
          <EditableArticleContent
            data={defaultData}
            onSave={(data) => mutate(data)}
          />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </section>
      ) : (
        <section>
          <p>{defaultData}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </section>
      )}
    </article>
  );
}
