"use client";

import { FC, useCallback } from "react";
import { ErrorComponent } from "next/dist/client/components/error-boundary";

import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";
import EmptyIcon from "../icons/EmptyIcon";
import ErrorIcon from "../icons/ErrorIcon";
import ResetIcon from "../icons/ResetIcon";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

import STYLE from "./controller.module.scss";

export const ControllerErrorPage: ErrorComponent = ({ error, reset }) => {
  const {
    device: { top, bottom },
  } = useZustandDeviceStore();

  const onResetClick = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <div
      className={STYLE.__controller_page_container}
      style={{
        height: `calc(100vh - ${top} - ${LAYOUT_HEADER_HEIGHT} - ${bottom} - ${LAYOUT_FOOTER_HEIGHT})`,
      }}
    >
      <div className={STYLE.__controller_page_box}>
        <div className={STYLE.__controller_page_icon_wrapper}>
          <ErrorIcon width="100px" height="100px" color="#636e72" />
        </div>
        <span
          className={STYLE.__controller_page_text}
          dangerouslySetInnerHTML={{ __html: error.message }}
        />

        <button
          className={STYLE.__controller_page_reset_button}
          onClick={onResetClick}
        >
          <ResetIcon color="#636e72" />
          try reset
        </button>
      </div>
    </div>
  );
};

const ControllerEmptyPage: FC<{ text: string }> = ({ text }) => {
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

interface ControllerPageComponent {
  Error: typeof ControllerErrorPage;
  Empty: typeof ControllerEmptyPage;
}

const ControllerPage: ControllerPageComponent = () => null;

export default ControllerPage;

ControllerPage.Error = ControllerErrorPage;
ControllerPage.Empty = ControllerEmptyPage;
