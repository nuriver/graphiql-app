import QueryCodeEditor from './QueryCodeEditor';

export default function Query({ updateUrl }): JSX.Element {
  return (
    <div className="graphiql-query-wrapper">
      <h3>Query</h3>
      <QueryCodeEditor updateUrl={updateUrl} />
    </div>
  );
}
