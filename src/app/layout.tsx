import React from 'react';
import '../styles/main.css';
import StoreProvider from './StoreProvider';
import { AuthProvider } from '../authorization/AuthContext';
// import AuthGuard from '../authorization/AuthGuard';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import ErrorBoundary from './ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //ТУТ ВСЕ ЧТОБЫ БЫЛО УДОБНО РАБОТАТЬ ОСТАЛЬНЫМ ИСПРАВИТЬ ПЕРЕД ДЕПЛОЕМ
//   const publicRoutes = [
//     '/sign-in',
//     '/sign-up',
//     '/GRAPHQL',
//     '/restfull-client',
//     '/history',
//   ];

  return (
    <html lang="en">
      <body>
        {/* <ErrorBoundary> */}
        <AuthProvider>
          {/* <AuthGuard publicRoutes={publicRoutes}> */}
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
          {/* </AuthGuard> */}
        </AuthProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
