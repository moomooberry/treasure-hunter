"use client";

import { ErrorComponent } from "next/dist/client/components/error-boundary";
import ControllerPage from "@src/components/controller/ControllerPage";
import Layout from "@src/components/layout";

const TreasureDetailError: ErrorComponent = ({ error, reset }) => (
  <Layout>
    <Layout.Header title={error.name} />
    <Layout.Body>
      <ControllerPage.Error error={error} reset={reset} />
    </Layout.Body>
  </Layout>
);

export default TreasureDetailError;
