"use client";

import { FC, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import LayoutHeaderMaxSizeButton from "@src/components/layout/header/_components/LayoutHeaderMaxSizeButton";

const TreasureMapIcon = dynamic(
  () => import("@src/components/icons/TreasureMapIcon")
);

const TreasureMainHeaderButton: FC = () => {
  const { push, prefetch } = useRouter();

  const onClick = () => {
    push("/treasure/add");
  };

  useEffect(() => {
    prefetch("/treasure/add");
  }, [prefetch]);

  return (
    <LayoutHeaderMaxSizeButton onClick={onClick}>
      <TreasureMapIcon width="32px" height="32px" />
    </LayoutHeaderMaxSizeButton>
  );
};

export default TreasureMainHeaderButton;
