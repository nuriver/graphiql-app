import { render } from '@testing-library/react';
import Page from '../[[...slug]]/page';
import GraphiqlMain from './GraphiqlMain';

jest.mock('./GraphiqlMain', () => jest.fn(() => <div>GraphiqlMain Mock</div>));

describe('Page Component', () => {
  it('renders correctly without slug', () => {
    const params = { slug: undefined };
    render(<Page params={params} />);

    expect(GraphiqlMain).toHaveBeenCalledWith(
      { requestData: null, isRedirected: false },
      {}
    );
  });

  it('renders correctly with slug', () => {
    const params = { slug: ['eyJxdWVyeSI6ICJ7IGFsbCBxdWVyaWVzIH0ifQ=='] };
    render(<Page params={params} />);

    expect(GraphiqlMain).toHaveBeenCalledWith(
      { requestData: { query: '{ all queries }' }, isRedirected: true },
      {}
    );
  });

  it('sets requestData and isRedirected correctly based on slug', () => {
    const params = { slug: ['eyJxdWVyeSI6ICJ7IGFsbCBxdWVyaWVzIH0ifQ=='] };
    render(<Page params={params} />);

    const expectedRequestData = { query: '{ all queries }' };
    expect(GraphiqlMain).toHaveBeenCalledWith(
      { requestData: expectedRequestData, isRedirected: true },
      {}
    );
  });
});
