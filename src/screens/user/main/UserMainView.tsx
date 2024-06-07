"use client";

import { FC } from "react";

import Layout from "@src/components/layout";

import UserMainCard from "./_components/card";
import UserMainList from "./_components/list";

import STYLE from "./user.main.module.scss";

const UserMainView: FC = () => (
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
