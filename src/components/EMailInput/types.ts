import { FunctionComponent } from "react";

export type TEMailInputProps = {
  label: string;

  error?: boolean | undefined;
  message?: string | undefined;

  onChange: (value: string | null) => void;
  value: string | null;
};

export type TEMailInput = FunctionComponent<TEMailInputProps>;
