"use client";

import { ErrorComponent } from "next/dist/client/components/error-boundary";

import ControllerPage from "@src/components/controller/ControllerPage";
import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";

const TreasureDetailEditError: ErrorComponent = ({ error, reset }) => (
  <>
    <LayoutHeader.Common title={error.name} />
    <LayoutBody>
      <ControllerPage.Error error={error} reset={reset} />
    </LayoutBody>
  </>
);

export default TreasureDetailEditError;
