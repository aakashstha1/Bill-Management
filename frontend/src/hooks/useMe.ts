import { useQuery } from "@tanstack/react-query";
import { getMeAPI, refreshAccessTokenAPI } from "../services/auth.service";
import type { AxiosError } from "axios";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await getMeAPI();
        return res.data;
      } catch (err: unknown) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          // #region agent log
          fetch(
            "http://127.0.0.1:7624/ingest/a4453ec7-4758-403d-8bbe-115da5886b55",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "eaf485",
              },
              body: JSON.stringify({
                sessionId: "eaf485",
                runId: "pre-fix",
                hypothesisId: "H1",
                location: "useMe.ts:queryFn",
                message: "getMe 401, attempting refresh",
                data: {},
                timestamp: Date.now(),
              }),
            },
          ).catch(() => {});
          // #endregion
          await refreshAccessTokenAPI();
          // #region agent log
          fetch(
            "http://127.0.0.1:7624/ingest/a4453ec7-4758-403d-8bbe-115da5886b55",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "eaf485",
              },
              body: JSON.stringify({
                sessionId: "eaf485",
                runId: "pre-fix",
                hypothesisId: "H1",
                location: "useMe.ts:queryFn",
                message: "refresh completed, retrying getMe",
                data: {},
                timestamp: Date.now(),
              }),
            },
          ).catch(() => {});
          // #endregion

          const res = await getMeAPI();
          return res.data;
        }
        throw err;
      }
    },
    retry: false,
  });
};
