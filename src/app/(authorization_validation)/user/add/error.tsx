"use client";

import { ErrorComponent } from "next/dist/client/components/error-boundary";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import StatusPageError from "@src/components/status/page/StatusPageError";

const UserAddError: ErrorComponent = ({ error, reset }) => (
  <>
    <LayoutHeaderCommon title={error.name} />

    <LayoutBodyCommon paddingX="0">
      <StatusPageError error={error} reset={reset} />
    </LayoutBodyCommon>
  </>
);

export default UserAddError;
