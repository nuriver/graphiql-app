'use client';

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(`Our ErrorBoundary successfully caught the error: ${error}`);
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          {this.props.children}
          <div className="error-popup">
            <div className="error-popup-content">
              <h2>Oops, something went wrong!</h2>
              <p>
                Do not worry! Our ErrorBoundary successfully caught the error.
                All you need to do is click the button below to continue.
              </p>
              <button onClick={this.handleRetry}>Try Again</button>
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
