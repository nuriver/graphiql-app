'use client';

import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch } from '../../../store/store';
import { setGraphiqlVariables } from '../../../store/graphiqlFeatures/graphiqlSlice';

function VariablesCodeEditor() {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (value: string) => {
      setValue(value);
      dispatch(setGraphiqlVariables(value));
    },
    [dispatch]
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
    />
  );
}
export default VariablesCodeEditor;
