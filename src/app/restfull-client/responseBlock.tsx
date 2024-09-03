'use client';
import { ResponseProps } from '../../core/types';
import BodyResponse from './bodyResponse';
import Status from './status';

const ResponseBlock: React.FC<ResponseProps> = ({ response }) => {
  return (
    <div className="rest-client__response">
      <Status status={response.status} statusText={response.statusText} />
      <BodyResponse body={response.body} />
    </div>
  );
};

export default ResponseBlock;
