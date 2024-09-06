import { MouseEventHandler, useRef } from 'react';
import VariablesCodeEditor from './VariablesCodeEditor';

export default function Variables({
  updateUrl,
}: {
  updateUrl: () => void;
}): JSX.Element {
  const variablesRef = useRef<HTMLDivElement>(null);

  const contentToggle: MouseEventHandler<HTMLButtonElement> = () => {
    if (variablesRef.current) {
      if (variablesRef.current.classList.contains('graphql-hidden-content')) {
        variablesRef.current.classList.remove('graphql-hidden-content');
      } else {
        variablesRef.current.classList.add('graphql-hidden-content');
      }
    }
  };

  return (
    <div
      className="graphiql-variables-wrapper graphql-hidden-content"
      ref={variablesRef}
    >
      <header className="graphiql-variables-header">
        <h3>Variables</h3>
        <button className="content-toggle-button" onClick={contentToggle}>
          <span></span>
        </button>
      </header>
      <VariablesCodeEditor updateUrl={updateUrl} />
    </div>
  );
}
