"use client";

import { LAYOUT_FOOTER_HEIGHT } from "@src/constants/layout";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";

const LayoutFooter: FC = () => {
  const { push } = useRouter();

  const paddingBottom = useReduxSelector(
    (state) => state.reduxDevice.device.bottom
  );

  const onTreasureClick = useCallback(() => {
    push("/treasure");
  }, [push]);

  const onMapClick = useCallback(() => {
    push("/map");
  }, [push]);

  const onUserClick = useCallback(() => {
    push("/user");
  }, [push]);

  return (
    <div
      style={{
        zIndex: 2,
        boxSizing: "content-box",
        position: "fixed",
        bottom: 0,
        width: "100vw",
        gridTemplateColumns: "repeat(3, 1fr)",
        display: "grid",

        backgroundColor: "beige",
        paddingBottom,
        height: LAYOUT_FOOTER_HEIGHT,
      }}
    >
      <button
        style={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onTreasureClick}
      >
        treasure
      </button>
      <button
        style={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onMapClick}
      >
        map
      </button>
      <button
        style={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onUserClick}
      >
        user
      </button>
    </div>
  );
};

export default LayoutFooter;
