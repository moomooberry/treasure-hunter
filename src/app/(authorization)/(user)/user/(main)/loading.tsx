import { FC } from "react";

import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterMain from "@src/components/layout/footer/LayoutFooterMain";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";

const UserMainLoading: FC = () => (
  <>
    <LayoutHeaderCommon title="내 정보" backDisabled />

    <LayoutBodyCommon />

    <LayoutFooterMain />
  </>
);

export default UserMainLoading;
