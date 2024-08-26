import EndpointInput from './EndpointInput';
import Headers from './Headers';
import Query from './Query';
import SdlInput from './SdlInput';
import Variables from './Variables';

export default function Graphiql(): JSX.Element {
  return (
    <section className="graphiql">
      <h2>GraphiQL Client</h2>
      <EndpointInput />
      <SdlInput />
      <Headers />
      <Query />
      <Variables />
    </section>
  );
}
