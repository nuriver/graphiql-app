'use client';

import { KeyboardEventHandler, useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch } from '../../../store/store';
import { setGraphiqlQuery } from '../../../store/graphiqlFeatures/graphiqlSlice';
import toastNonLatinError from '../../../utils/toastNonLatinError';

function QueryCodeEditor({ updateUrl }: { updateUrl: () => void }) {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (value: string) => {
      if (/^[\x00-\x7F]*$/.test(value)) {
        setValue(value);
        dispatch(setGraphiqlQuery(value));
      } else {
        toastNonLatinError();
      }
    },
    [dispatch]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const char = event.key;
      if (
        [
          'Backspace',
          'Delete',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Tab',
          'Enter',
        ].includes(char)
      ) {
        return;
      }

      if (!/^[\x00-\x7F]$/.test(char)) {
        event.preventDefault();
        toastNonLatinError();
      }
    },
    []
  );

  return (
    <CodeMirror
      value={value}
      height="100px"
      extensions={[json()]}
      onChange={onChange}
      style={{
        fontSize: '20px',
        color: '#65558F',
      }}
      onBlur={updateUrl}
      onKeyDown={handleKeyDown}
    />
  );
}
export default QueryCodeEditor;
