'use client';

import { Component, ReactNode } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

interface ErrorBoundaryProps extends WithTranslation {
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
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <>
          {this.props.children}
          <div className="error-popup">
            <div className="error-popup-content">
              <h2>{t('error_boundary_message')}</h2>
              <p>{t('error_boundary_proposal')}</p>
              <button onClick={this.handleRetry}>{t('error_proposal')}</button>
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
