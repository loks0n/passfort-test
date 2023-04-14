type Props = {
  title: string;
  data: string;
};

export default function ArticlePage({ title, data }: Props) {
  return (
    <article>
      <header>
        <h1 data-testid="page-detail-heading">{title}</h1>
      </header>
      <section>{data}</section>
    </article>
  );
}
