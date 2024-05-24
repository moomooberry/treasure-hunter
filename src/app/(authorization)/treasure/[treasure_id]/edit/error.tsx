"use client";

import ControllerPage from "@src/components/controller/ControllerPage";
import Layout from "@src/components/layout";
import { ErrorComponent } from "next/dist/client/components/error-boundary";

const TreasureDetailEditError: ErrorComponent = ({ error, reset }) => (
  <Layout>
    <Layout.Header title={error.name} />
    <Layout.Body>
      <ControllerPage.Error error={error} reset={reset} />
    </Layout.Body>
  </Layout>
);

export default TreasureDetailEditError;
