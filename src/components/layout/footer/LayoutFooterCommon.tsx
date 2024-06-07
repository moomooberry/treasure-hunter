"use client";

import { FC, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";

import ChestIcon from "@src/components/icons/ChestIcon";
import LocationIcon from "@src/components/icons/LocationIcon";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import Avatar from "@src/components/avatar";

import LayoutFooter, { LayoutFooterProps } from ".";

import STYLE from "./layout.footer.module.scss";

type LayoutFooterCommonProps = Omit<LayoutFooterProps, "children">;

const LayoutFooterCommon: FC<LayoutFooterCommonProps> = ({
  backgroundColor = "#fff",
  disabledShadow = false,
}) => {
  const { push } = useRouter();

  const { data } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

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
    <LayoutFooter
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

        {data && (
          <button
            className={classNames({
              [STYLE.__footer_main_button]: true,
              [STYLE.__footer_main_button_activate]:
                pathname.startsWith("/user"),
            })}
            onClick={onUserClick}
          >
            <Avatar imageSrc={data.profile_image} width="24px" height="24px" />
            내 정보
          </button>
        )}
      </div>
    </LayoutFooter>
  );
};

export default LayoutFooterCommon;
