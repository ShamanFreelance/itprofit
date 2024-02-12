export const LATIN_NUM_PUNCT_REG = new RegExp(
  "^[ A-Za-z0-9.,\"'\\/#!$%\\^&\\*;:{}=\\-_`~()\\[\\]]*$"
);

export const MAIL_REG = new RegExp("^[A-Za-z0-9@.]*$");

// Request status
export enum Status {
  pending = "pending",
  success = "success",
  loading = "loading",
  error = "error",
}

// Request message
export const REQUEST_ERROR: { [key in Status]?: string } = {
  [Status.success]: "Successful registration",
  [Status.error]: "Registration error",
};
