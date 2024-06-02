"use client";

import { FC } from "react";
import Layout from "@src/components/layout";
import UserMainCard from "./_components/card";

import STYLE from "./user.main.module.scss";
import UserMainListItem from "./_components/list/UserMainListItem";
import UserMainList from "./_components/list";

export interface UserMainViewProps {}

const UserMainView: FC<UserMainViewProps> = () => (
  <Layout>
    <Layout.Header title="@@user" backDisabled />
    <Layout.Body>
      <div className={STYLE.__user_main_container}>
        <UserMainCard />

        <UserMainList />
      </div>
    </Layout.Body>
    <Layout.Footer />
  </Layout>
);

export default UserMainView;
