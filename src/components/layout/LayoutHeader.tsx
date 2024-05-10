"use client";

import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { useRouter } from "next/navigation";
import { FC, MouseEventHandler, ReactNode, useCallback } from "react";

import STYLE from "./layout.module.scss";
import CaretIcon from "../icons/CaretIcon";

interface LayoutHeaderProps {
  title?: string;

  backgroundColor?: string;
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  backDisabled?: boolean;

  option?: ReactNode;
}

const LayoutHeader: FC<LayoutHeaderProps> = ({
  title,

  backgroundColor = "#fff",
  onBackClick,
  backDisabled,

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
      className={STYLE.__layout_header_container}
      style={{
        backgroundColor,
        paddingTop,
        height: LAYOUT_HEADER_HEIGHT,
      }}
    >
      {!backDisabled ? (
        <button
          style={{
            width: LAYOUT_HEADER_HEIGHT,
            height: LAYOUT_HEADER_HEIGHT,
          }}
          onClick={onHeaderBackClick}
        >
          <CaretIcon width="20px" height="20px" />
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
