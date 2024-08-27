'use client';

import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function CodeEditor() {
  const [value, setValue] = useState('');
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);
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
    />
  );
}
export default CodeEditor;
