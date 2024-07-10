"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterCommon from "@src/components/layout/footer/LayoutFooterCommon";

const UserMainProfileCard = dynamic(
  () => import("./_components/UserMainProfileCard")
);

const UserMainList = dynamic(() => import("./_components/list"));

const UserMainView: FC = () => (
  <>
    <LayoutHeaderCommon title="내 정보" backDisabled />

    <LayoutBodyCommon>
      <UserMainProfileCard />

      <UserMainList />
    </LayoutBodyCommon>

    <LayoutFooterCommon />
  </>
);

export default UserMainView;
