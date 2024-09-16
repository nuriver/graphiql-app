import { render, screen } from '@testing-library/react';
import HistoryPage from '../../app/history/History';
import getRequestHistory from '../../utils/getRequestHistory';

jest.mock('../../utils/getRequestHistory', () => jest.fn());

describe('HistoryPage', () => {
  it('renders HistoryRequests when there are requests', () => {
    (getRequestHistory as jest.Mock).mockReturnValue([{ id: 1, name: '' }]);

    render(<HistoryPage />);

    expect(screen.getByText(/History Requests/i)).toBeInTheDocument();
  });

  it('renders HistoryEmpty when there are no requests', () => {
    (getRequestHistory as jest.Mock).mockReturnValue(null);

    render(<HistoryPage />);

    expect(
      screen.getByText(/You haven't executed any requests/i)
    ).toBeInTheDocument();
  });
});
