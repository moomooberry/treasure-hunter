"use client";

import { FC } from "react";

import LayoutBody from "@src/components/layout/body";
import LayoutFooter from "@src/components/layout/footer";
import LayoutHeader from "@src/components/layout/header";

const UserMainFallback: FC = () => (
  <>
    <LayoutHeader.Common title="내 정보" backDisabled />
    <LayoutBody.Common />
    <LayoutFooter.Common />
  </>
);

export default UserMainFallback;
