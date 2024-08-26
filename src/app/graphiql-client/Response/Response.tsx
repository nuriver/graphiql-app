import Body from './Body';
import Documentation from './Documentation';
import StatusOutput from './StatusOutput';

export default function Response(): JSX.Element {
  return (
    <section className="graphiql-response">
      <h2>Response</h2>
      <StatusOutput />
      <Body />
      <Documentation />
    </section>
  );
}
