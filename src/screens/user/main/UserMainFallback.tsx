"use client";

import { FC } from "react";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterCommon from "@src/components/layout/footer/LayoutFooterCommon";

const UserMainFallback: FC = () => (
  <>
    <LayoutHeaderCommon title="내 정보" backDisabled />
    <LayoutBodyCommon />
    <LayoutFooterCommon />
  </>
);

export default UserMainFallback;
