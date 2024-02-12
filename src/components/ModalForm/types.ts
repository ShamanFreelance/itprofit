import { FunctionComponent } from "react";

export type TModalFormProps = {
  open: boolean;
  error: boolean;
  message?: string | undefined;
};

export type TModalForms = FunctionComponent<TModalFormProps>;
