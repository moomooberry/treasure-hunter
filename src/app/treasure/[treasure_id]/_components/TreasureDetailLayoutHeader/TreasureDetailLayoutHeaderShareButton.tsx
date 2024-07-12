"use client";

import { FC, useCallback, useState } from "react";

import ShareIcon from "@src/components/icons/ShareIcon";
import DrawerBottom from "@src/components/drawer/DrawerBottom";

import STYLE from "./treasure.detail.layout.header.module.scss";

const TreasureDetailLayoutHeaderShareButton: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <>
      <button className={STYLE.__header_option_button} onClick={openDrawer}>
        <ShareIcon width="18px" height="18px" />
      </button>

      <DrawerBottom
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        contentHeight="200px"
      >
        {/* TODO 공유하기 */}
        @@공유하기
      </DrawerBottom>
    </>
  );
};

export default TreasureDetailLayoutHeaderShareButton;
