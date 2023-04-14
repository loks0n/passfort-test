import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

type Props = {
  title: string;
  data: string;
  onSave: () => void;
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

export function EditableArticleContent({ title, data, onSave }: Props) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(data);

  const { mutate, error, isLoading } = useMutation<void, Error, string>({
    mutationFn: (data) => saveContent(title, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['page_latest', title]);
      queryClient.invalidateQueries(['page_revisions', title]);
    },
  });

  return (
    <div>
      {error && <p>{error.message}</p>}
      <input
        type="textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        aria-busy={isLoading}
        onClick={() => {
          mutate(value);
          onSave();
        }}
      >
        Save
      </button>
    </div>
  );
}
