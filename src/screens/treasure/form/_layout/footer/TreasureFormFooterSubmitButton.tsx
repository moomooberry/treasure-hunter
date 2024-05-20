"use client";

import { FC, MouseEventHandler } from "react";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { LAYOUT_FOOTER_HEIGHT } from "@src/constants/layout";

import STYLE from "./treasure.form.layout.footer.button.module.scss";

interface TreasureFormFooterSubmitButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TreasureFormFooterSubmitButton: FC<
  TreasureFormFooterSubmitButtonProps
> = ({ onClick }) => {
  const paddingBottom = useReduxSelector(
    (state) => state.reduxDevice.device.bottom
  );

  return (
    <div
      className={STYLE.__footer_button_container}
      style={{
        height: LAYOUT_FOOTER_HEIGHT,
        paddingBottom,
      }}
    >
      <button className={STYLE.__footer_button_submit} onClick={onClick}>
        제출하기
      </button>
    </div>
  );
};

export default TreasureFormFooterSubmitButton;
