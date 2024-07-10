"use client";

import { FC, MouseEventHandler, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

import CaretIcon from "@src/components/icons/CaretIcon";
import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";

import LayoutHeaderContainer, {
  LayoutHeaderContainerProps,
} from "./_components/LayoutHeaderContainer";

import STYLE from "./layout.header.module.scss";

interface LayoutHeaderCommonProps
  extends Omit<LayoutHeaderContainerProps, "children"> {
  title?: string;
  backDisabled?: boolean;
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  option?: ReactNode;
}

const LayoutHeaderCommon: FC<LayoutHeaderCommonProps> = ({
  backgroundColor = "#fff",
  shadowDisabled = false,
  backDisabled = false,
  onBackClick,
  option,
  title,
}) => {
  const { back } = useRouter();

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
    <LayoutHeaderContainer
      backgroundColor={backgroundColor}
      shadowDisabled={shadowDisabled}
    >
      {!backDisabled ? (
        <button
          className={STYLE.__header_container_back_button}
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

      <b className={STYLE.__header_title}>{title}</b>

      {option ?? (
        <div
          style={{
            width: LAYOUT_HEADER_HEIGHT,
            height: LAYOUT_HEADER_HEIGHT,
          }}
        />
      )}
    </LayoutHeaderContainer>
  );
};

export default LayoutHeaderCommon;
