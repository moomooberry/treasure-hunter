"use client";

import { FC } from "react";

import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";
import EmptyIcon from "@src/components/icons/EmptyIcon";

import STYLE from "../status.module.scss";

const StatusEmptyPage: FC<{ text: string }> = ({ text }) => {
  const {
    device: { top, bottom },
  } = useZustandDeviceStore();

  return (
    <div
      className={STYLE.__controller_page_container}
      style={{
        height: `calc(100vh - ${top} - ${LAYOUT_HEADER_HEIGHT} - ${bottom} - ${LAYOUT_FOOTER_HEIGHT})`,
      }}
    >
      <div className={STYLE.__controller_page_box}>
        <div className={STYLE.__controller_page_icon_wrapper}>
          <EmptyIcon width="100px" height="100px" color="#636e72" />
        </div>
        <span
          className={STYLE.__controller_page_text}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default StatusEmptyPage;
