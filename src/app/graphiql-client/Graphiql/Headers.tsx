'use client';

import {
  addGraphiqlHeader,
  updateGraphiqlHeader,
} from '../../../store/graphiqlFeatures/graphiqlSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import toastNonLatinError from '../../../utils/toastNonLatinError';

export default function Headers({
  updateUrl,
}: {
  updateUrl: () => void;
}): JSX.Element {
  const headers = useAppSelector((state) => state.graphiql.headers);
  const dispatch = useAppDispatch();

  const addHeader = () => {
    dispatch(addGraphiqlHeader());
  };

  const updateHeader = (id: string, key: string, value: string) => {
    dispatch(updateGraphiqlHeader({ id, key, value }));
  };

  return (
    <div className="graphiql-headers-wrapper">
      <header className="graphiql-headers-header">
        <h3>Headers</h3>
        <button className="add-headers-button" onClick={addHeader}>
          add headers
        </button>
        <button className="content-toggle-button">
          <span></span>
        </button>
      </header>
      <main className="graphiql-headers-main">
        <div className="graphiql-headers-name-wrapper">
          <h4>Header key</h4>
          <h4>Header value</h4>
        </div>
        {headers.map((header) => (
          <div className="graphiql-headers-pairs-wrapper" key={header.id}>
            <input
              type="text"
              className="graphiql-headers-key-input"
              value={header.key}
              onChange={(event) => {
                if (/^[\x00-\x7F]*$/.test(event.target.value)) {
                  updateHeader(header.id, event.target.value, header.value);
                } else {
                  toastNonLatinError();
                }
              }}
              onBlur={updateUrl}
            />
            <input
              type="text"
              className="graphiql-headers-value-input"
              value={header.value}
              onChange={(event) => {
                if (/^[\x00-\x7F]*$/.test(event.target.value)) {
                  updateHeader(header.id, header.key, event.target.value);
                } else {
                  toastNonLatinError();
                }
              }}
              onBlur={updateUrl}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
