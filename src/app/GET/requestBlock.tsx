'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Endpoint from './endpoint';
import Method from './method';
import Headers from './headers';
import BodyRequest from './bodyRequest';
import { handleRequest } from '../../utils/handleRequest';
import isDisabled from '../../utils/isDisabled';
import { RestfulState } from '../../core/types';
import { toast } from 'react-toastify';
import { setRestfulUrl } from '../../store/restfulSlice';

const RequestBlock: React.FC = () => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [body, setBody] = useState<string>('');

  const headers = useAppSelector((state) => state.restful.headers);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    handleRequest({
      endpoint,
      method,
      body,
      headers: Object.fromEntries(
        headers.map((header) => [header.headerKey, header.headerValue])
      ),
      dispatch,
    });
  };
  const requestData: RestfulState = {
    method,
    endpoint,
    body,
    headers,
  };

  const containsNonLatin1 = (str: string) => /[^\x00-\xFF]/.test(str);

  const requestDataString = JSON.stringify(requestData);
  let finalRequestData: string;
  if (containsNonLatin1(requestDataString)) {
    toast.error('Only Latin letters are allowed');
  } else {
    const encodedRequestData = btoa(requestDataString);
    finalRequestData = encodedRequestData.replace(/=+$/, '');
    console.log(atob(finalRequestData));
  }

  const updateUrl = () => {
    if (finalRequestData) {
      dispatch(setRestfulUrl(finalRequestData));
      window.history.replaceState(null, '', `/GRAPHQL/${finalRequestData}`);
    }
  };

  return (
    <div className="rest-client__request">
      <div className="request__method-url-wrapper">
        <Method method={method} setMethod={setMethod} />
        <Endpoint
          endpoint={endpoint}
          setEndpoint={setEndpoint}
          updateUrl={updateUrl}
        />
      </div>
      <Headers />
      <BodyRequest body={body} setBody={setBody} />
      <button
        onClick={handleClick}
        disabled={isDisabled([endpoint])}
        className="request__send-button"
      >
        Send Request
      </button>
    </div>
  );
};

export default RequestBlock;

// 'use client';

// import React, { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../store/store';
// import Endpoint from './endpoint';
// import Method from './method';
// import Headers from './headers';
// import BodyRequest from './bodyRequest';
// import { RequestBlockProps } from '../../core/types';
// import { handleRequest } from '../../utils/handleRequest';
// import isDisabled from '../../utils/isDisabled';

// const RequestBlock: React.FC<RequestBlockProps> = ({ setResponse }) => {
//   const [endpoint, setEndpoint] = useState<string>('');
//   const [method, setMethod] = useState<string>('GET');
//   const [body, setBody] = useState<string>('');

//   const headers = useAppSelector((state) => state.restful.headers);
//   const dispatch = useAppDispatch();

//   const handleClick = () => {
//     handleRequest({
//       endpoint,
//       method,
//       body,
//       headers: Object.fromEntries(
//         headers.map((header) => [header.headerKey, header.headerValue])
//       ),
//       setResponse,
//       dispatch,
//     });
//   };

//   return (
//     <div className="rest-client__request">
//       <div className="request__method-url-wrapper">
//         <Method method={method} setMethod={setMethod} />
//         <Endpoint endpoint={endpoint} setEndpoint={setEndpoint} />
//       </div>
//       <Headers />
//       <BodyRequest body={body} setBody={setBody} />
//       <button
//         onClick={handleClick}
//         disabled={isDisabled([endpoint])}
//         className="request__send-button"
//       >
//         Send Request
//       </button>
//     </div>
//   );
// };

// export default RequestBlock;
