import { ErrorBoundary } from "react-error-boundary";

import BrokenComponent from "./BrokenComponent";
import ErrorFallback from "./ErrorFallback";

function RenderErrorDemo() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log("Boundary reset");
      }}
    >
      <BrokenComponent />
    </ErrorBoundary>
  );
}

export default RenderErrorDemo;