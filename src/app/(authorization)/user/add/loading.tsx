import LayoutFooterMaxWidthButton from "@src/components/layout/footer/LayoutFooterMaxWidthButton";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";

const UserAddLoading = () => (
  <>
    <LayoutHeaderCommon title="프로필 만들기" backDisabled />
    <LayoutFooterMaxWidthButton disabled>저장하기</LayoutFooterMaxWidthButton>
  </>
);

export default UserAddLoading;
