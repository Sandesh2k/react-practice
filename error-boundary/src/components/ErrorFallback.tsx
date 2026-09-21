import type { FallbackProps } from "react-error-boundary";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div>
      <h2>Something went wrong 😕</h2>

      <p>{error.message}</p>

      <button onClick={resetErrorBoundary}>
        Retry
      </button>
    </div>
  );
}

export default ErrorFallback;