import { ResponseProps } from '../../../core/types';
import ResponseBlock from '../../GET/responseBlock';

const Response: React.FC<ResponseProps> = ({ response }) => {
  return (
    <section className="graphiql-response">
      <h2>Response</h2>
      <ResponseBlock response={response} />
    </section>
  );
};

export default Response;
