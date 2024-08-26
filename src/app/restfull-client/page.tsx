'use client';
import RequestBlock from './requestBlock';
import '../../styles/main.scss';
import store from '../../store/store';
import { Provider } from 'react-redux';
import ResponseBlock from './responseBlock';

export default function Page() {
  return (
    <Provider store={store}>
      <div className="rest-client">
        <h1>REST Client</h1>
        <RequestBlock />
        <h1>Response</h1>
        <ResponseBlock />
      </div>
    </Provider>
  );
}
