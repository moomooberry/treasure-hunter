"use client";

import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { useRouter } from "next/navigation";
import { FC, MouseEventHandler, ReactNode, useCallback } from "react";

interface LayoutHeaderProps {
  title?: string;

  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  backDisabled?: boolean;

  option?: ReactNode;
}

const LayoutHeader: FC<LayoutHeaderProps> = ({
  title,

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
    <div
      style={{
        zIndex: 2,
        boxSizing: "content-box",
        position: "fixed",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",

        backgroundColor: "aliceblue",
        paddingTop,
        height: LAYOUT_HEADER_HEIGHT,
      }}
    >
      {!backDisabled ? (
        <button
          style={{
            width: "48px",
            height: "48px",
          }}
          onClick={onHeaderBackClick}
        >
          a
        </button>
      ) : (
        <div
          style={{
            width: "48px",
            height: "48px",
          }}
        />
      )}

      <b
        style={{
          position: "fixed",
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        {title}
      </b>

      {option ?? (
        <div
          style={{
            width: "48px",
            height: "48px",
          }}
        />
      )}
    </div>
  );
};

export default LayoutHeader;
