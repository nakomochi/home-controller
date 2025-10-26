import { Hono } from "hono";

const app = new Hono();

const route = app
	.use("*", async (c) => {})
	.get("/", (c) => {
		return c.text("Hello Hono!");
	});

type AppType = typeof route;

export default route;
export type { AppType };
