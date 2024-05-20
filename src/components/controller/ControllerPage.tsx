"use client";

import { FC, useCallback } from "react";
import EmptyIcon from "../icons/EmptyIcon";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";
import { ErrorComponent } from "next/dist/client/components/error-boundary";
import ErrorIcon from "../icons/ErrorIcon";
import ResetIcon from "../icons/ResetIcon";

import STYLE from "./controller.module.scss";

export const ControllerErrorPage: ErrorComponent = ({ error, reset }) => {
  const top = useReduxSelector((state) => state.reduxDevice.device.top);
  const bottom = useReduxSelector((state) => state.reduxDevice.device.bottom);

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
  const top = useReduxSelector((state) => state.reduxDevice.device.top);
  const bottom = useReduxSelector((state) => state.reduxDevice.device.bottom);

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
