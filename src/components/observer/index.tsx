"use client";

import { FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";

interface ObserverProps {
  minHeight?: string;
  onObserve?: VoidFunction;
  onUnObserve?: VoidFunction;
}

const Observer: FC<PropsWithChildren<ObserverProps>> = ({
  minHeight = "45px",
  onObserve,
  onUnObserve,
  children,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        onObserve?.();
      } else {
        onUnObserve?.();
      }
    },
    [onObserve, onUnObserve]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div
      ref={observerRef}
      style={{
        width: "100%",
        minHeight,
      }}
    >
      {children}
    </div>
  );
};

export default Observer;
