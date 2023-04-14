import { useState } from 'react';
import { EditableArticleContent } from './EditableArticleContent';
import RevisionList from './RevisionList';

type Props = {
  title: string;
  data: string;
};

export default function EditableArticlePage({ title, data }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article>
      <header>
        <h1 data-testid="page-detail-heading">{title}</h1>
      </header>
      {isEditing ? (
        <section>
          <EditableArticleContent
            title={title}
            data={data}
            onSave={() => setIsEditing(false)}
          />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </section>
      ) : (
        <section>
          <p>{data}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </section>
      )}
      <footer>
        <RevisionList title={title} />
      </footer>
    </article>
  );
}
