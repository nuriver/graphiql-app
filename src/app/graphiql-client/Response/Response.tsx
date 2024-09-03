import ResponseBlock from '../../restfull-client/responseBlock';
import Documentation from './Documentation';

export default function Response({ response }): JSX.Element {
  return (
    <section className="graphiql-response">
      <h2>Response</h2>
      <ResponseBlock response={response} />
      <Documentation />
    </section>
  );
}
