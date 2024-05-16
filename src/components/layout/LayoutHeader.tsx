"use client";

import { FC, MouseEventHandler, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import CaretIcon from "../icons/CaretIcon";

import STYLE from "./layout.module.scss";

interface LayoutHeaderProps {
  title?: string;

  backgroundColor?: string;
  backDisabled?: boolean;
  shadowDisabled?: boolean;

  onBackClick?: MouseEventHandler<HTMLButtonElement>;

  option?: ReactNode;
}

const LayoutHeader: FC<LayoutHeaderProps> = ({
  title,

  backgroundColor = "#fff",
  backDisabled = false,
  shadowDisabled = false,

  onBackClick,

  option,
}) => {
  const { back } = useRouter();

  const paddingTop = useReduxSelector((state) => state.reduxDevice.device.top);

  const onHeaderBackClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      if (onBackClick) {
        onBackClick(e);
        return;
      }
      back();
    },
    [back, onBackClick]
  );

  return (
    <header
      className={classNames({
        [STYLE.__layout_header_container]: true,
        [STYLE.__layout_header_container_box_shadow]: !shadowDisabled,
      })}
      style={{
        backgroundColor,
        paddingTop,
        height: LAYOUT_HEADER_HEIGHT,
      }}
    >
      {!backDisabled ? (
        <button
          className={STYLE.__layout_header_container_back_button}
          onClick={onHeaderBackClick}
        >
          <CaretIcon width="14px" height="14px" />
        </button>
      ) : (
        <div
          style={{
            width: LAYOUT_HEADER_HEIGHT,
            height: LAYOUT_HEADER_HEIGHT,
          }}
        />
      )}

      <b className={STYLE.__layout_header_title}>{title}</b>

      {option ?? (
        <div
          style={{
            width: LAYOUT_HEADER_HEIGHT,
            height: LAYOUT_HEADER_HEIGHT,
          }}
        />
      )}
    </header>
  );
};

export default LayoutHeader;
