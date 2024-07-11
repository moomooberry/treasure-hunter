import { FC } from "react";
import classNames from "classnames";

import STYLE from "./treasure.detail.map.module.scss";

const TreasureDetailMapFallback: FC = () => (
  <div
    className={classNames({ [STYLE.__map]: true, [STYLE.__map_loading]: true })}
  />
);

export default TreasureDetailMapFallback;
