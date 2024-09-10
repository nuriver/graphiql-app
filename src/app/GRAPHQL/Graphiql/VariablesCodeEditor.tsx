'use client';

import { KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setGraphiqlVariables } from '../../../store/graphiqlFeatures/graphiqlSlice';
import toastNonLatinError from '../../../utils/toastNonLatinError';

function VariablesCodeEditor({ updateUrl }: { updateUrl: () => void }) {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const variables = useAppSelector((state) => state.graphiql.variables);

  useEffect(() => {
    if (variables !== '{}') {
      setValue(variables);
    } else {
      setValue('');
    }
  }, [variables]);

  const onChange = useCallback(
    (value: string) => {
      if (/^[\x00-\x7F]*$/.test(value)) {
        setValue(value);
        dispatch(setGraphiqlVariables(value));
      } else {
        toastNonLatinError();
      }
    },
    [dispatch]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const isModifierKey = event.ctrlKey || event.metaKey || event.altKey;
      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Tab',
        'Enter',
        'Escape',
        'Shift',
      ];

      if (
        isModifierKey ||
        allowedKeys.includes(event.key) ||
        /[\{\}\[\]\(\)]/.test(event.key)
      ) {
        return;
      }

      if (/^[\x00-\x7F]$/.test(event.key)) {
        return;
      }

      event.preventDefault();

      toastNonLatinError();
    },
    []
  );

  return (
    <CodeMirror
      value={value}
      height="200px"
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
export default VariablesCodeEditor;
