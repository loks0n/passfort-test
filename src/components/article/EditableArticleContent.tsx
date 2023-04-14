import { useState } from 'react';

type Props = {
  data: string;
  onSave: (data: string) => void;
};

export function EditableArticleContent({ data, onSave }: Props) {
  const [value, setValue] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <input
        type="textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        aria-busy={isLoading}
        onClick={() => {
          onSave(value);
          setIsLoading(true);
        }}
      >
        Save
      </button>
    </div>
  );
}
