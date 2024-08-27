'use client';

// import { useState } from "react";

// import CodeMirror from '@uiw/react-codemirror';
// import { useState } from 'react';

// const QueryCodeEditor = () => {
//     const [code, setCode] = useState('')

//     const handleCodeChange = (value: string) => {
//       setCode(value);
//   };

//   return (
//     <div className="test-mirror">
//       <CodeMirror
//         value={code}
//         theme={'none'}
//         height="200px"

//         onChange={handleCodeChange}
//         style={{
//           fontSize: '20px',
//           border: 'none',
//           outline: 'none',
//           borderRadius: '15px'
//         }}
//       />
//     </div>
//   );
// }

// export default QueryCodeEditor;

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
