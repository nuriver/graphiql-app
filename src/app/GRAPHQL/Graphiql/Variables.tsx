import { MouseEventHandler, useRef } from 'react';
import VariablesCodeEditor from './VariablesCodeEditor';
import '../../../../i18n';
import { useTranslation } from 'react-i18next';

export default function Variables({
  updateUrl,
}: {
  updateUrl: () => void;
}): JSX.Element {
  const variablesRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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
        <h3>{t('variables')}</h3>
        <button className="content-toggle-button" onClick={contentToggle}>
          <span></span>
        </button>
      </header>
      <VariablesCodeEditor updateUrl={updateUrl} />
    </div>
  );
}
