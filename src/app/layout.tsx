import React from 'react';
import '../styles/main.css';
import StoreProvider from './StoreProvider';
import { AuthProvider } from '../authorization/AuthContext';
import AuthGuard from '../authorization/AuthGuard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorBoundary from './ErrorBoundary';
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const publicRoutes = ['/sign-in', '/sign-up'];

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <body>
        <ErrorBoundary>
          <AuthProvider>
            <AuthGuard publicRoutes={publicRoutes}>
              <StoreProvider>
                <Header />
                {children}
                <Footer />
              </StoreProvider>
            </AuthGuard>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
