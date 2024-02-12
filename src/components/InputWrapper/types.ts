import { FunctionComponent } from "react";

export type TInputWrapperProps = {
  label: string;
  message?: string | undefined;

  error?: boolean | undefined;
  warning?: boolean;

  render: TRender;
};

export type TInputWrapper = FunctionComponent<TInputWrapperProps>;

export type TRender = (classes: string) => JSX.Element;
