"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import LayoutHeader from "@src/components/layout/header";
import LayoutBody from "@src/components/layout/body";
import LayoutFooter from "@src/components/layout/footer";

const UserMainProfileCard = dynamic(
  () => import("./_components/UserMainProfileCard")
);

const UserMainList = dynamic(() => import("./_components/list"));

const UserMainView: FC = () => (
  <>
    <LayoutHeader.Common title="내 정보" backDisabled />

    <LayoutBody.Common>
      <UserMainProfileCard />

      <UserMainList />
    </LayoutBody.Common>

    <LayoutFooter.Common />
  </>
);

export default UserMainView;
