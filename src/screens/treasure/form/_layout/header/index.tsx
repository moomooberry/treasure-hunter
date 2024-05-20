"use client";

import { FC, useMemo } from "react";
import { usePathname } from "next/navigation";
import LayoutHeader from "@src/components/layout/LayoutHeader";

const TreasureFormHeader: FC = () => {
  const pathname = usePathname();

  const title = useMemo(
    () => (pathname.endsWith("/add") ? "보물 등록" : "보물 수정"),
    [pathname]
  );

  return <LayoutHeader title={title} />;
};

export default TreasureFormHeader;
