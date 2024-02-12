import { useCallback, useEffect, useState } from "react";

import { TErrors, TUseValidate, TValidate } from "./types";
import { validatorMap } from "./constants";

const useValidate: TUseValidate = (type, data) => {
  const [errors, setErrors] = useState<TErrors>([]);

  const validate: TValidate = useCallback(
    (data) => {
      const errors: TErrors = validatorMap[type](data);

      setErrors(errors);
    },
    [setErrors, type]
  );

  useEffect(() => {
    if (data === null || data.length === 0) {
      return;
    }

    validate(data);
  }, [data, validate]);

  return errors;
};

export default useValidate;
