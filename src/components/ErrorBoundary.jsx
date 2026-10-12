import { Component } from 'react';

/**
 * Catches render/lifecycle errors anywhere below it in the tree. Without
 * this, a single unhandled error in any component (e.g. a malformed API
 * response crashing a .map()) blanks the entire page with no way back —
 * this shows a recoverable fallback instead, and reports the error to
 * Sentry if VITE_SENTRY_DSN is configured (see src/observability.js).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] caught:', error, info);
    if (window.Sentry) {
      window.Sentry.captureException(error, { extra: info });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Something went wrong</h1>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            This page hit an unexpected error. Refreshing usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
