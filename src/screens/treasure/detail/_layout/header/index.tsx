"use client";

import { FC, useEffect, useState } from "react";
import LayoutHeader from "@src/components/layout/LayoutHeader";
import TreasureDetailHeaderOption from "./TreasureDetailHeaderOption";

const TreasureDetailHeader: FC = () => {
  const [isOverThreshold, setIsOverThreshold] = useState(false);

  useEffect(() => {
    const THRESHOLD_SCROLL_VALUE = 300;

    const onScroll = () => {
      const scroll = window.scrollY;
      if (scroll > THRESHOLD_SCROLL_VALUE) {
        setIsOverThreshold(true);
      } else {
        setIsOverThreshold(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <LayoutHeader
      title={isOverThreshold ? "보물 찾기" : ""}
      backgroundColor={isOverThreshold ? "#fff" : "transparent"}
      shadowDisabled={!isOverThreshold}
      option={<TreasureDetailHeaderOption />}
    />
  );
};

export default TreasureDetailHeader;
