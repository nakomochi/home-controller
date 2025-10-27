import type { AppType } from "service";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:8787/", {
	init: {
		credentials: "include",
	},
});
export { client };
