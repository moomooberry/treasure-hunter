"use client";

import { FC, useEffect } from "react";
import TreasureMapIcon from "@src/components/icons/TreasureMapIcon";
import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";
import { useRouter } from "next/navigation";

const TreasureMainHeaderOption: FC = () => {
  const { push, prefetch } = useRouter();

  const onClick = () => {
    push("/treasure/add");
  };

  useEffect(() => {
    prefetch("/treasure/add");
  }, [prefetch]);

  return (
    <button
      style={{
        width: LAYOUT_HEADER_HEIGHT,
        height: LAYOUT_HEADER_HEIGHT,
      }}
      onClick={onClick}
    >
      <TreasureMapIcon width="32px" height="32px" />
    </button>
  );
};

export default TreasureMainHeaderOption;
