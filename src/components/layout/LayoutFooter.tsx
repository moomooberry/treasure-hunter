"use client";

import { FC, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { LAYOUT_FOOTER_HEIGHT } from "@src/constants/layout";
import ChestIcon from "../icons/ChestIcon";
import LocationIcon from "../icons/LocationIcon";
import UserIcon from "../icons/UserIcon";

import STYLE from "./layout.module.scss";

const LayoutFooter: FC = () => {
  const { push } = useRouter();

  const pathname = usePathname();

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
    <nav
      className={STYLE.__layout_footer_container}
      style={{
        paddingBottom,
        height: LAYOUT_FOOTER_HEIGHT,
      }}
    >
      <button
        className={STYLE.__layout_footer_button}
        onClick={onTreasureClick}
      >
        <ChestIcon
          color={pathname.startsWith("/treasure") ? "#0984e3" : "#000"}
        />
      </button>

      <button className={STYLE.__layout_footer_button} onClick={onMapClick}>
        <LocationIcon
          color={pathname.startsWith("/map") ? "#0984e3" : "#000"}
        />
      </button>

      <button className={STYLE.__layout_footer_button} onClick={onUserClick}>
        <UserIcon color={pathname.startsWith("/user") ? "#0984e3" : "#000"} />
      </button>
    </nav>
  );
};

export default LayoutFooter;
