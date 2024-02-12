import React, { memo, useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

import { TModalForms } from "./types";

const ModalForm: TModalForms = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openModal = () => {
      setIsOpen(true);
    };
    openModal();
  }, [props.open]);

  const closeModal = () => {
    setIsOpen(false);
  };
  const messageClasses = classNames(
    styles.message,
    props.error ? styles.message__error : styles.message__success
  );
  return (
    <div>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <span className={styles.btn__close} onClick={closeModal}>
              &times;
            </span>
            <div className={messageClasses}>
              <p>{props.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ModalForm);
