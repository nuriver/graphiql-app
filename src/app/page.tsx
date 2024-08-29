'use client';

import { AuthProvider } from '../authorization/AuthContext';
import Main from '../components/Main';

function MyApp() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default MyApp;
