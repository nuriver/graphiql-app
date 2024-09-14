import { act, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import Footer from '../../components/Footer';
import i18n from '../../../i18n';

describe('Footer component', () => {
  test('should render the footer component correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Footer />
      </I18nextProvider>
    );

    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByAltText(/RS logo/i)).toBeInTheDocument();
  });

  test('should render all the correct links', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Footer />
      </I18nextProvider>
    );

    const alexeiLink = screen.getByText(/Alexei/i);
    expect(alexeiLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/nuriver'
    );

    const mariaLink = screen.getByText(/Maria/i);
    expect(mariaLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/maryinfun'
    );

    const kateLink = screen.getByText(/Kate/i);
    expect(kateLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/aauroraaborealisrs'
    );
  });

  test('should display text in the correct language', async () => {
    await act(async () => {
      i18n.changeLanguage('en');
    });

    render(
      <I18nextProvider i18n={i18n}>
        <Footer />
      </I18nextProvider>
    );

    expect(screen.getByText(/Made by/i)).toBeInTheDocument();
    await act(async () => {
      await i18n.changeLanguage('ru');
    });

    render(
      <I18nextProvider i18n={i18n}>
        <Footer />
      </I18nextProvider>
    );
  });
});
