import { ButtonHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";

import STYLE from "./button.module.scss";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  width?: string;
  height?: string;
  variant?: "common" | "cancel";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ width = "100%", height = "40px", variant = "common", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames({
          [STYLE.__button]: true,
          [STYLE.__button_common]: variant === "common",
          [STYLE.__button_cancel]: variant === "cancel",
        })}
        style={{
          width,
          height,
        }}
        {...rest}
      />
    );
  }
);

export default Button;

Button.displayName = "Button";
