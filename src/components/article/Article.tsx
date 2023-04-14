import EditableContent from './EditableContent';
import RevisionList from './RevisionList';
import ReactMarkdown from 'react-markdown';

type Props = {
  title: string;
  data: string;
  editable?: boolean;
};

export default function Article({ title, data, editable }: Props) {
  return (
    <article>
      <header>
        <h1 data-testid="page-detail-heading">{title}</h1>
      </header>

      {editable ? (
        <EditableContent title={title} data={data} />
      ) : (
        <section>
          <ReactMarkdown>{data}</ReactMarkdown>
        </section>
      )}

      <footer>
        <RevisionList title={title} />
      </footer>
    </article>
  );
}
