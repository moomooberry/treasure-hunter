"use client";

import { useCallback } from "react";
import { ErrorComponent } from "next/dist/client/components/error-boundary";

import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";
import ErrorIcon from "@src/components/icons/ErrorIcon";
import ResetIcon from "@src/components/icons/ResetIcon";

import STYLE from "../status.module.scss";

const StatusPageError: ErrorComponent = ({ error, reset }) => {
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

export default StatusPageError;
