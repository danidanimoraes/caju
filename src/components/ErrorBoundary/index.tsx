import * as React from "react";
import { ErrorState } from "~/components";

type ErrorBoundaryProps = React.PropsWithChildren;

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, errorInfo);

    const derivedState = { hasError: !!error };

    this.setState(derivedState);
  }

  override render() {
    if (this.state.hasError) {
      return <ErrorState />;
    }

    return this.props.children;
  }
}
