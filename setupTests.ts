import i18n from './i18n';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
  i18n.changeLanguage('en');
});

fetchMock.enableMocks();
