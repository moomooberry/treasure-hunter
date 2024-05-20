import { FC } from "react";
import Layout from "@src/components/layout";
import TreasureFormHeader from "./_layout/header";

import STYLE from "./treasure.form.module.scss";

const TreasureFormFallback: FC = () => (
  <Layout>
    <TreasureFormHeader />
    <Layout.Body>
      {/* <div className={STYLE.__treasure_form_fallback} /> */}
      <div
        style={{ width: "100vw", height: "50vh", backgroundColor: "purple" }}
      />
    </Layout.Body>
  </Layout>
);

export default TreasureFormFallback;
