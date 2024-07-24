"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { ErrorComponent } from "next/dist/client/components/error-boundary";

import StatusPage from "../_components/StatusPage";

const ErrorIcon = dynamic(() => import("@src/components/icons/ErrorIcon"));

const StatusErrorPage: ErrorComponent = ({ error, reset }) => {
  const onResetClick = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <StatusPage>
      <StatusPage.IconWrapper>
        <ErrorIcon width="100px" height="100px" color="#636e72" />
      </StatusPage.IconWrapper>

      <StatusPage.Text text={error.message} />

      <StatusPage.ResetButton onClick={onResetClick} />
    </StatusPage>
  );
};

export default StatusErrorPage;
