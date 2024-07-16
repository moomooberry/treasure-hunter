"use client";

import { FC, useCallback } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { motion } from "framer-motion";

import Avatar from "@src/components/avatar/Avatar";

import LayoutFooterContainer, {
  LayoutFooterContainerProps,
} from "./_components/LayoutFooterContainer";

import STYLE from "./layout.footer.module.scss";

const ChestIcon = dynamic(() => import("@src/components/icons/ChestIcon"));

const LocationIcon = dynamic(
  () => import("@src/components/icons/LocationIcon")
);

interface LayoutFooterMainProps
  extends Omit<LayoutFooterContainerProps, "children"> {
  profileImg?: string | null;
}

const LayoutFooterMain: FC<LayoutFooterMainProps> = ({
  backgroundColor = "#fff",
  disabledShadow = false,
  profileImg,
}) => {
  const { push } = useRouter();

  const pathname = usePathname();

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
    <LayoutFooterContainer
      backgroundColor={backgroundColor}
      disabledShadow={disabledShadow}
    >
      <div className={STYLE.__footer_main_button_wrapper}>
        <button
          className={classNames({
            [STYLE.__footer_main_button]: true,
            [STYLE.__footer_main_button_activate]:
              pathname.startsWith("/treasure"),
          })}
          onClick={onTreasureClick}
        >
          <ChestIcon
            color={pathname.startsWith("/treasure") ? "#636e72" : "#b2bec3"}
          />
          보물 찾기
        </button>

        <button
          className={classNames({
            [STYLE.__footer_main_button]: true,
            [STYLE.__footer_main_button_activate]: pathname.startsWith("/map"),
          })}
          onClick={onMapClick}
        >
          <LocationIcon
            color={pathname.startsWith("/map") ? "#636e72" : "#b2bec3"}
          />
          지도 보기
        </button>

        <button
          className={classNames({
            [STYLE.__footer_main_button]: true,
            [STYLE.__footer_main_button_activate]: pathname.startsWith("/user"),
          })}
          onClick={onUserClick}
        >
          <motion.div initial={{ opacity: 0.3 }} animate={{ opacity: 1 }}>
            <Avatar imageSrc={profileImg} width="24px" height="24px" />
          </motion.div>
          내 정보
        </button>
      </div>
    </LayoutFooterContainer>
  );
};

export default LayoutFooterMain;
