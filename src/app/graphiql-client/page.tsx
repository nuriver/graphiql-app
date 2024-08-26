import Graphiql from './Graphiql/Graphiql';
import Response from './Response/Response';

export default function Page() {
  return (
    <div className="graphiql-page-wrapper">
      <Graphiql />
      <Response />
    </div>
  );
}
