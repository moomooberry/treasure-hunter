"use client";

import { FC, memo, useEffect, useId, useRef } from "react";
import lottie, { AnimationConfigWithData } from "lottie-web";

export interface LottieProps
  extends Omit<
    AnimationConfigWithData,
    "renderer" | "container" | "path" | "name"
  > {
  width?: string;
  height?: string;
}

const Lottie: FC<LottieProps> = ({
  width,
  height,
  loop = true,
  autoplay = true,
  ...rest
}) => {
  const lottieRef = useRef<HTMLDivElement>(null);

  const id = useId();

  useEffect(() => {
    if (!lottieRef.current) return;
    lottie.loadAnimation({
      name: id,
      container: lottieRef.current,
      renderer: "svg",
      autoplay,
      loop,
      ...rest,
    });

    return () => {
      lottie.destroy(id);
    };
  }, [autoplay, id, loop, rest]);

  return (
    <div
      style={{
        width,
        height,
      }}
      ref={lottieRef}
    />
  );
};

export default memo(Lottie);
