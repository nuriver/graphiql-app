import QueryCodeEditor from './QueryCodeEditor';

export default function Query({
  updateUrl,
}: {
  updateUrl: () => void;
}): JSX.Element {
  return (
    <div className="graphiql-query-wrapper">
      <h3>Query</h3>
      <QueryCodeEditor updateUrl={updateUrl} />
    </div>
  );
}
