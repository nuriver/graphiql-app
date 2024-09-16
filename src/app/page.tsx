'use client';

import { AuthProvider } from '../authorization/AuthContext';
import Main from '../components/Main';
import '../../i18n';

function MyApp() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default MyApp;
