'use client';
import { ResponseProps } from '../../core/types';
import BodyResponse from './bodyResponse';
import Status from './status';

const ResponseBlock: React.FC<ResponseProps> = ({ response }) => {
  return (
    <div className="rest-client__response">
      <BodyResponse body={response.body} />
      <Status status={response.status} statusText={response.statusText} />
    </div>
  );
};

export default ResponseBlock;
