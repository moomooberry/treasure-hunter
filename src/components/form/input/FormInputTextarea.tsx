"use client";

import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";
import classNames from "classnames";

import STYLE from "../form.module.scss";

export interface FormInputTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  maxLength?: number;
  showMaxLength?: boolean;
  isError?: boolean;
  m?: string;
}

type FormInputTextareaComponent = {
  forwardRef: ForwardedRef<HTMLTextAreaElement>;
  props: FormInputTextareaProps;
};

const FormInputTextarea: FC<FormInputTextareaComponent> = ({
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

  const onTextChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      const { value } = event.currentTarget;
      setLength(value.length);
      onChange?.(event);
    },
    [onChange]
  );

  const onTextInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
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
      <textarea
        ref={forwardRef}
        className={classNames({
          [STYLE.__form_input_textarea]: true,
          [STYLE.__form_input_error]: isError,
        })}
        onChange={onTextChange}
        onInput={onTextInput}
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

export default FormInputTextarea;

FormInputTextarea.displayName = "FormTextarea";
