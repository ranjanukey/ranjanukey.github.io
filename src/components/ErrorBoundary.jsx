import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console and potentially to error reporting service
    console.error('Portfolio Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Here you could send error to monitoring service
    // Example: Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl">⚠️</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-secondary text-lg mb-8">
                We encountered an unexpected error. Don't worry, this has been logged and we're working on it.
              </p>
            </div>

            <div className="bg-tertiary rounded-lg p-6 mb-8 text-left">
              <h3 className="text-white font-semibold mb-2">Technical Details:</h3>
              <div className="text-sm text-gray-400 font-mono">
                <p className="mb-2">Error: {this.state.error && this.state.error.toString()}</p>
                <details className="mt-4">
                  <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
                    View Stack Trace
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                🔄 Reload Page
              </button>
              <a
                href="mailto:work.ranjanukey@gmail.com?subject=Portfolio Error Report"
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                📧 Report Issue
              </a>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <p>You can also try:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Refreshing the page</li>
                <li>Clearing your browser cache</li>
                <li>Trying a different browser</li>
                <li>Contacting me directly if the issue persists</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = (Component, componentName = 'Component') => {
  return function WithErrorBoundaryComponent(props) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export default ErrorBoundary;
