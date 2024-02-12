import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import { TChangePosition, TData, TPhoneInput } from "./types";
import { getInitData, getPhone } from "./utils";
import { PHONE_PLACEHOLDER } from "./constants";

import InputWrapper from "../InputWrapper";

import useValidate from "../../hooks/useValidate";
import { TInputChangeHandler } from "../../shared/types";
import { ValidatorField } from "../../hooks/useValidate/constants";

const PhoneInput: TPhoneInput = (props) => {
  const { value, onChange, label, message, error } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TData>(
    getInitData(value === null ? "" : value)
  );
  const [isFocused, setFocused] = useState<boolean>(false);

  const { phone, template, position } = data;

  const errors = useValidate(ValidatorField.Phone, phone);

  const changeHandler: TInputChangeHandler = useCallback(
    (event) => {
      const { value } = event.target;

      let result: string;

      if (value.length < template.length) {
        result = phone.slice(0, -1);
      } else {
        result = getPhone(value);
      }

      const data = getInitData(result);
      const { phone: newPhone } = data;

      setData(data);
      onChange(newPhone);
    },
    [setData, phone, onChange]
  );

  const changePosition: TChangePosition = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    ref.current.setSelectionRange(position, position);
  }, [ref, data, position]);

  /*
    Update 'phone' if 'value' changes
  */
  useEffect(() => {
    if (value === phone) {
      return;
    }

    setData(getInitData(value === null ? "" : value));
  }, [setData, value, phone]);

  /*
    TODO: Move to hook
    Update cursor position
  */
  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    ref.current.setSelectionRange(position, position);
  }, [ref, data, position]);

  const hasWarning = phone.length > 0 && errors.length > 0;
  const msg = hasWarning ? errors[0] : message;

  const focusHandler = useCallback(() => {
    setFocused(true);
  }, [setFocused]);
  const blurHandler = useCallback(() => {
    setFocused(false);
  }, [setFocused]);

  return (
    <InputWrapper
      message={msg}
      warning={hasWarning}
      error={error}
      label={label}
      render={(classes) => (
        <input
          ref={ref}
          className={classes}
          value={isFocused || phone.length !== 0 ? template : ""}
          placeholder={
            !isFocused && phone.length === 0 ? PHONE_PLACEHOLDER : ""
          }
          onClick={changePosition}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
      )}
    />
  );
};

export default memo(PhoneInput);
