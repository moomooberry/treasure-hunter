"use client";

import { FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";

interface ObserverProps {
  onObserve?: VoidFunction;
  onUnObserve?: VoidFunction;
  threshold?: number;
  minHeight?: string;
}

const Observer: FC<PropsWithChildren<ObserverProps>> = ({
  children,
  onObserve,
  onUnObserve,
  threshold = 0.3,
  minHeight = "45px",
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
      threshold,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [handleObserver, threshold]);

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
