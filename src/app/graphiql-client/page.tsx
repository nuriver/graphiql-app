import EndpointInput from './EndpointInput';
import Headers from './Headers';
import Query from './Query';
import SdlInput from './SdlInput';
import Variables from './Variables';

export default function Page() {
  return (
    <div className="graphiql-page-wrapper">
      <section className="graphiql-main">
        <h3>GraphiQL Client</h3>
        <EndpointInput />
        <SdlInput />
        <Headers />
        <Query />
        <Variables />
      </section>
      <section className="graphiql-response">
        <h3 className="graphql-section-header">Response</h3>
      </section>
    </div>
  );
}
