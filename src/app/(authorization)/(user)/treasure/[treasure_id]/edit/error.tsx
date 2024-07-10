"use client";

import { ErrorComponent } from "next/dist/client/components/error-boundary";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyContainer from "@src/components/layout/body/_components/LayoutBodyContainer";
import StatusPageError from "@src/components/status/page/StatusPageError";

const TreasureDetailEditError: ErrorComponent = ({ error, reset }) => (
  <>
    <LayoutHeaderCommon title={error.name} />

    <LayoutBodyContainer>
      <StatusPageError error={error} reset={reset} />
    </LayoutBodyContainer>
  </>
);

export default TreasureDetailEditError;
