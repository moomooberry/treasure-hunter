"use client";

import { FC } from "react";

import LayoutHeader from "@src/components/layout/header";
import LayoutBody from "@src/components/layout/body";
import LayoutFooter from "@src/components/layout/footer";

import UserMainCard from "./_components/card";
import UserMainList from "./_components/list";

const UserMainView: FC = () => (
  <>
    <LayoutHeader.Common title="내 정보" backDisabled />

    <LayoutBody.Common>
      <UserMainCard />

      <UserMainList />
    </LayoutBody.Common>

    <LayoutFooter.Common />
  </>
);

export default UserMainView;
