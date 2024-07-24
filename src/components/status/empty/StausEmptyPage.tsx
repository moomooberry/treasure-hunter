"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import StatusPage from "../_components/StatusPage";

const EmptyIcon = dynamic(() => import("@src/components/icons/EmptyIcon"));

interface StatusEmptyPageProps {
  text: string;
}

const StatusEmptyPage: FC<StatusEmptyPageProps> = ({ text }) => (
  <StatusPage>
    <StatusPage.IconWrapper>
      <EmptyIcon width="100px" height="100px" color="#636e72" />
    </StatusPage.IconWrapper>

    <StatusPage.Text text={text} />
  </StatusPage>
);

export default StatusEmptyPage;
