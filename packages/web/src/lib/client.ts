import type { AppType } from "service";
import { hc } from "hono/client";
import { API_URL } from "service";

const client = hc<AppType>(API_URL ? API_URL : "http://localhost:8787/", {
  init: {
    credentials: "include",
  },
});
export { client };
