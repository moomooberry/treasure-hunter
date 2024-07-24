"use client";

import { ErrorComponent } from "next/dist/client/components/error-boundary";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyContainer from "@src/components/layout/body/_components/LayoutBodyContainer";
import StatusErrorPage from "@src/components/status/error/StatusErrorPage";

const UserAddError: ErrorComponent = ({ error, reset }) => (
  <>
    <LayoutHeaderCommon title={error.name} />

    <LayoutBodyContainer>
      <StatusErrorPage error={error} reset={reset} />
    </LayoutBodyContainer>
  </>
);

export default UserAddError;
