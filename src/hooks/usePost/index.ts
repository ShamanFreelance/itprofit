import { useCallback, useState } from "react";
import axios from "axios";

import { TPost, TUsePost } from "./types";

import { Status } from "../../shared/constants";

const usePost: TUsePost = () => {
  const [status, setStatus] = useState<Status>(Status.pending);

  const post: TPost = useCallback(
    async (state) => {
      const { email, name, text, phone } = state;

      if (name === null || email === null || phone === null || text === null) {
        return;
      }

      setStatus(Status.loading);

      await axios
        .post("http://localhost:9090/api/registration", state)
        .then(() => setStatus(Status.success))
        .catch(() => setStatus(Status.error));
    },
    [setStatus]
  );

  return {
    status,
    setStatus,
    post,
  };
};

export default usePost;
