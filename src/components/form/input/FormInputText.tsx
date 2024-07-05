"use client";

import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  ForwardedRef,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import classNames from "classnames";

import STYLE from "../form.module.scss";

export interface FormInputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "style" | "type"> {
  maxLength?: number;
  showMaxLength?: boolean;
  isError?: boolean;
  m?: string;
}

type FormInputTextComponent = {
  forwardRef: ForwardedRef<HTMLInputElement>;
  props: FormInputTextProps;
};

const FormInputText: FC<FormInputTextComponent> = ({
  forwardRef,
  props: {
    maxLength,
    showMaxLength,
    isError,
    m = "0px",
    onChange,
    onInput,
    ...rest
  },
}) => {
  const [length, setLength] = useState<number>(0);

  const onTextChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const { value } = event.currentTarget;
      setLength(value.length);
      onChange?.(event);
    },
    [onChange]
  );

  const onTextInput = useCallback<FormEventHandler<HTMLInputElement>>(
    (event) => {
      const { value } = event.currentTarget;
      if (maxLength && value.length >= maxLength) {
        event.currentTarget.value = value.slice(0, maxLength);
      }
      onInput?.(event);
    },
    [maxLength, onInput]
  );

  return (
    <div
      style={{
        margin: m,
      }}
    >
      <input
        ref={forwardRef}
        className={classNames({
          [STYLE.__form_input]: true,
          [STYLE.__form_input_error]: isError,
        })}
        onInput={onTextInput}
        onChange={onTextChange}
        maxLength={maxLength}
        {...rest}
      />
      {maxLength && showMaxLength && (
        <div
          className={classNames({
            [STYLE.__form_input_max_length]: true,
            [STYLE.__form_input_max_length_error]: isError,
          })}
        >
          {length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default FormInputText;

FormInputText.displayName = "FormInputText";
