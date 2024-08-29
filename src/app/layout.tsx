import React from 'react';
import '../styles/main.css';
import StoreProvider from './StoreProvider';
import { AuthProvider } from '../authorization/AuthContext';
import AuthGuard from '../authorization/AuthGuard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="test">
        <AuthProvider>
          <AuthGuard>
            <StoreProvider>
              <Header />
              {children}
              <Footer />
            </StoreProvider>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
