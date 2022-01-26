import React, { ErrorInfo, ReactNode } from "react";

type ErrorProps = { fallbackUI: ReactNode };
type ErrorState = { hasError: boolean; errorInfo: ErrorInfo };

export class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  state = { hasError: false, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true, errorInfo });
  }

  renderError = () =>
    this.props.fallbackUI ?? <pre>{this.state.errorInfo?.componentStack}</pre>;

  render() {
    return this.state.hasError ? this.renderError() : this.props.children;
  }
}
