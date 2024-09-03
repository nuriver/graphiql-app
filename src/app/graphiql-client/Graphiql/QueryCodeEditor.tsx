'use client';

import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useAppDispatch } from '../../../store/store';
import { setGraphiqlQuery } from '../../../store/graphiqlFeatures/graphiqlSlice';

function QueryCodeEditor({ updateUrl }) {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (value: string) => {
      setValue(value);
      dispatch(setGraphiqlQuery(value));
    },
    [dispatch]
  );

  return (
    <CodeMirror
      value={value}
      height="100px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
      style={{
        fontSize: '20px',
        color: '#65558F',
      }}
      onBlur={updateUrl}
    />
  );
}
export default QueryCodeEditor;
