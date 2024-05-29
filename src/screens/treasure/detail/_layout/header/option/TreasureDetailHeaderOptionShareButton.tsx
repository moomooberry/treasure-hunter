"use client";

import { FC, useCallback, useState } from "react";
import DrawerBottom from "@src/components/drawer/DrawerBottom";
import ShareIcon from "@src/components/icons/ShareIcon";

import STYLE from "./treasure.detail.header.option.module.scss";

const TreasureDetailHeaderOptionShareButton: FC = () => {
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

export default TreasureDetailHeaderOptionShareButton;
