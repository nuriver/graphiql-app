'use client';

import { BodyResponseProps } from '../../core/types';

export default function BodyResponse({ body }: BodyResponseProps) {
  return (
    <div className="response__body">
      <h2 className="body__title">Body</h2>
      <div className="body__window">
        {body ? (
          <pre className="body__window-pre">
            {JSON.stringify(body, null, 2)}
          </pre>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
