import { FC } from "react";
import Layout from "@src/components/layout";
import TreasureFormHeader from "./_layout/header";

const TreasureFormFallback: FC = () => (
  <Layout>
    <TreasureFormHeader />
    <Layout.Body />
  </Layout>
);

export default TreasureFormFallback;
