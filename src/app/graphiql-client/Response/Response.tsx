import ResponseBlock from '../../restfull-client/responseBlock';
import Documentation from './Documentation';

export default function Response({ response }): JSX.Element {
  return (
    <section className="graphiql-response">
      <h2>Response</h2>
      {/* <div className="response-wrapper">
        <StatusOutput />
        <Body />
      </div>
      <Documentation /> */}
      <ResponseBlock response={response} />
      <Documentation />
    </section>
  );
}
