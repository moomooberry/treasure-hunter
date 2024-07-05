import { ComponentType, forwardRef } from "react";

function wrapWithForwardRef<R, P>(Component: ComponentType<any>) {
  const Result = forwardRef<R, P>((props, ref) => (
    <Component props={props} forwardRef={ref} />
  ));

  Result.displayName = Component.displayName || Component.name || "Component";

  return Result;
}

export default wrapWithForwardRef;
