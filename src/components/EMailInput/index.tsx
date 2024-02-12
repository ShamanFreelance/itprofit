import React, { memo, useCallback, useEffect, useState } from "react";

import { TEMailInput } from "./types";
import { EMAIL_PLACEHOLDER, SPACE_REG } from "./constants";

import InputWrapper from "../InputWrapper";

import useValidate from "../../hooks/useValidate";
import { TInputChangeHandler } from "../../shared/types";
import { ValidatorField } from "../../hooks/useValidate/constants";
import { MAIL_REG } from "../../shared/constants";

const EmailInput: TEMailInput = (props) => {
  const { value, onChange, label, error, message } = props;

  const [email, setEmail] = useState<string | null>(value);
  const errors = useValidate(ValidatorField.EMail, email);

  const changeHandler: TInputChangeHandler = useCallback(
    (event) => {
      const { value } = event.target;

      if (!MAIL_REG.test(value)) {
        return;
      }

      const newValue = value.replace(SPACE_REG, "");

      onChange(newValue);
    },
    [setEmail, onChange]
  );

  /*
    Update 'email' if 'value' changes
  */
  useEffect(() => {
    if (value === email) {
      return;
    }

    setEmail(value);
  }, [setEmail, value, email]);

  const hasWarning = email !== null && email.length > 0 && errors.length > 0;
  const msg = hasWarning ? errors[0] : message;

  return (
    <InputWrapper
      message={msg}
      warning={hasWarning}
      error={error}
      label={label}
      render={(classes) => (
        <input
          className={classes}
          placeholder={EMAIL_PLACEHOLDER}
          value={email || ""}
          onChange={changeHandler}
        />
      )}
    />
  );
};

export default memo(EmailInput);
