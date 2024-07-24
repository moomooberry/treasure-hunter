"use client";

import { FC, MouseEventHandler, PropsWithChildren } from "react";
import dynamic from "next/dynamic";

import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";

import STYLE from "./status.page.module.scss";

const ResetIcon = dynamic(() => import("@src/components/icons/ResetIcon"));

const StatusPageIconWrapper: FC<PropsWithChildren> = ({ children }) => (
  <div className={STYLE.__controller_page_icon_wrapper}>{children}</div>
);

const StatusPageText: FC<{ text: string }> = ({ text }) => (
  <span
    className={STYLE.__controller_page_text}
    dangerouslySetInnerHTML={{ __html: text }}
  />
);

const StatusPageResetButton: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => (
  <button className={STYLE.__controller_page_reset_button} onClick={onClick}>
    <ResetIcon color="#636e72" />
    try reset
  </button>
);

interface StatusPageComponent extends FC<PropsWithChildren> {
  IconWrapper: typeof StatusPageIconWrapper;
  Text: typeof StatusPageText;
  ResetButton: typeof StatusPageResetButton;
}

const StatusPage: StatusPageComponent = ({ children }) => {
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
      <div className={STYLE.__controller_page_box}>{children}</div>
    </div>
  );
};

StatusPage.IconWrapper = StatusPageIconWrapper;
StatusPage.Text = StatusPageText;
StatusPage.ResetButton = StatusPageResetButton;

export default StatusPage;
