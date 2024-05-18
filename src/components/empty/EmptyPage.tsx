import { FC, ReactNode } from "react";
import EmptyIcon from "../icons/EmptyIcon";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";

import STYLE from "./empty.module.scss";

interface EmptyPageProps {
  icon?: ReactNode;
  text: string;
}

const EmptyPage: FC<EmptyPageProps> = ({ icon, text }) => {
  const top = useReduxSelector((state) => state.reduxDevice.device.top);
  const bottom = useReduxSelector((state) => state.reduxDevice.device.bottom);

  return (
    <div
      className={STYLE.__empty_page_container}
      style={{
        height: `calc(100vh - ${top} - ${LAYOUT_HEADER_HEIGHT} - ${bottom} - ${LAYOUT_FOOTER_HEIGHT})`,
      }}
    >
      <div className={STYLE.__empty_page_box}>
        <div className={STYLE.__empty_page_icon_wrapper}>
          <EmptyIcon width="100px" height="100px" color="#636e72" />
        </div>
        <span
          className={STYLE.__empty_page_text}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default EmptyPage;
