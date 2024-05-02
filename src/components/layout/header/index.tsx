"use client";

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
        position: "fixed",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
        height: "48px",
        backgroundColor: "aliceblue",
        zIndex: 2,
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
