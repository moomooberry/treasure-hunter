"use client";

import { FC } from "react";
import Layout from "@src/components/layout";

export interface UserMainViewProps {}

const UserMainView: FC<UserMainViewProps> = () => (
  <Layout>
    <Layout.Header title="@@user" backDisabled />
    <Layout.Body>@@user</Layout.Body>
    <Layout.Footer />
  </Layout>
);

export default UserMainView;
