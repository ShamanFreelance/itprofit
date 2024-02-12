import React, { memo } from "react";
import { TSpinner } from "./types";

import styles from "./styles.module.scss";

const Spinner: TSpinner = () => {
  return <div className={styles.spinner} />;
};

export default memo(Spinner);
