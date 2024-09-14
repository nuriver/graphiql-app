'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Endpoint from './endpoint';
import Method from './method';
import Headers from './headers';
import BodyRequest from './bodyRequest';
import isDisabled from '../../utils/isDisabled';
import { RestfulState } from '../../core/types';
import { toast } from 'react-toastify';
import { setRestfulUrl } from '../../store/restfulSlice';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

const RequestBlock = ({ requestHandler }: { requestHandler: () => void }) => {
  const endpoint = useAppSelector((state) => state.restful.endpoint);
  const body = useAppSelector((state) => state.restful.body);
  const { t } = useTranslation();
  const headers = useAppSelector((state) => state.restful.headers);
  const dispatch = useAppDispatch();
  const method = useAppSelector((state) => state.restful.method);

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
  }

  const updateUrl = () => {
    if (finalRequestData) {
      dispatch(setRestfulUrl(finalRequestData));
      window.history.replaceState(null, '', `/${method}/${finalRequestData}`);
    }
  };

  return (
    <div className="rest-client__request">
      <div className="request__method-url-wrapper">
        <Method updateUrl={updateUrl} />
        <Endpoint updateUrl={updateUrl} />
      </div>
      <Headers updateUrl={updateUrl} />
      <BodyRequest updateUrl={updateUrl} />
      <button
        onClick={requestHandler}
        disabled={isDisabled([endpoint])}
        className="request__send-button"
      >
        {t('send_request')}
      </button>
    </div>
  );
};

export default RequestBlock;
