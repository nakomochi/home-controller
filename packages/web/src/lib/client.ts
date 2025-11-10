import type { AppType } from "service";
import { hc } from "hono/client";
import { PUBLIC_API_URL } from "$env/static/public";

const client = hc<AppType>(PUBLIC_API_URL, {
	init: {
		credentials: "include",
	},
});
export { client };
