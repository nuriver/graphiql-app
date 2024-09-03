import VariablesCodeEditor from './VariablesCodeEditor';

export default function Variables({
  updateUrl,
}: {
  updateUrl: () => void;
}): JSX.Element {
  return (
    <div className="graphiql-variables-wrapper">
      <header className="graphiql-variables-header">
        <h3>Variables</h3>
        <button className="content-toggle-button">
          <span></span>
        </button>
      </header>
      <VariablesCodeEditor updateUrl={updateUrl} />
    </div>
  );
}
