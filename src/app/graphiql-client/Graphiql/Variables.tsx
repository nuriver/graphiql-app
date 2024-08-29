import CodeEditor from './CodeEditor';

export default function Variables(): JSX.Element {
  return (
    <div className="graphiql-variables-wrapper">
      <header className="graphiql-variables-header">
        <h3>Variables</h3>
        <button className="content-toggle-button">
          <span></span>
        </button>
      </header>
      <CodeEditor />
    </div>
  );
}
