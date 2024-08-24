import RequestBlock from './requestBlock';
import '../../styles/main.scss';

export default function Page() {
  return (
    <div className="rest-client">
      <h1>REST Client</h1>
      <RequestBlock />
    </div>
  );
}
