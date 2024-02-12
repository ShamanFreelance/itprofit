import React, { memo } from "react";
import classNames from "classnames";

import { TInputWrapper } from "./types";
import styles from "./styles.module.scss";

const InputWrapper: TInputWrapper = (props) => {
  const { label, render, error, message, warning } = props;

  const containerClasses = classNames(styles.container);
  const labelClasses = classNames(
    styles.label,
    warning && styles.label__warning,
    error && styles.label__error
  );
  const inputClasses = classNames(
    styles.input,
    warning && styles.input__warning,
    error && styles.input__error
  );

  const messageClasses = classNames(
    styles.message,
    warning && styles.message__warning,
    error && styles.message__error
  );

  return (
    <div className={containerClasses}>
      <div className={labelClasses}>{label}</div>
      {render(inputClasses)}
      {!!message && <div className={messageClasses}>{message}</div>}
    </div>
  );
};

export default memo(InputWrapper);
