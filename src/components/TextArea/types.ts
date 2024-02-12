import { FunctionComponent } from "react";

export type TTextAreaProps = {
  label: string;

  error?: boolean | undefined;
  message?: string | undefined;

  onChange: (value: string | null) => void;
  value: string | null;
};

export type TTextArea = FunctionComponent<TTextAreaProps>;
