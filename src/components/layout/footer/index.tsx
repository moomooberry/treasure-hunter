"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";

const LayoutFooter: FC = () => {
  const { push } = useRouter();

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
        position: "fixed",
        bottom: 0,
        width: "100vw",
        height: "60px",
        backgroundColor: "beige",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        zIndex: 2,
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
