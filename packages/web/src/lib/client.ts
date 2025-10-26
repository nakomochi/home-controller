import type { AppType } from "service";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:8787/");
export { client };
