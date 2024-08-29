import CodeEditor from './CodeEditor';

export default function Query(): JSX.Element {
  return (
    <div className="graphiql-query-wrapper">
      <h3>Query</h3>
      <CodeEditor />
    </div>
  );
}
