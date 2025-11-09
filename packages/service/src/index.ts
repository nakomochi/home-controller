import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { cors } from "hono/cors";
import { db } from "./db/index";
import type { drizzle } from "drizzle-orm/bun-sqlite";
import { eq } from "drizzle-orm";
import { RASPBERRY_PI_URL, SECRET } from "./env.js";
import * as schema from "./db/schema";

export { API_URL } from "./env";

type Device = typeof schema.devices.$inferSelect;
type Variables = {
	db: ReturnType<typeof drizzle>;
	device: Device;
};
export type Details = {
	temperature: number;
	pressure: number;
	humidity: number;
	lux: number;
	fullSpectrum: number;
	infrared: number;
};


const app = new Hono<{ Variables: Variables }>();

const dbMiddleware = createMiddleware(async (c, next) => {
	c.set("db", db);
	await next();
});

const authMiddleware = createMiddleware(async (c, next) => {
	const session = getCookie(c, "session");
	if (!session) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const dbInstance = c.get("db");
	const sessionData = await dbInstance.query.sessions.findFirst({
		where: eq(schema.sessions.session, session),
		with: { device: true },
	});

	if (!sessionData || sessionData.expiresAt.getTime() < Date.now()) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	await next();
});

const routes = app
	.use("/api/*", dbMiddleware)
	.use(
		"/api/*",
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		}),
	)
	.get("/api/auth", authMiddleware, (c) => {
		const device = c.get("device");
		return c.json({ message: "Authenticated", device });
	})
	.post("/api/auth/create", async (c) => {
		const { password } = await c.req.json();
		if (!password) return c.json({ error: "Password is required" }, 400);

		const dbInstance = c.get("db");

		const isValid = await Bun.password.verify(password, await SECRET);
		if (!isValid) return c.json({ error: "Invalid password" }, 401);

		const session = crypto.randomUUID();
		const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

		const deviceId = await dbInstance
			.insert(schema.devices)
			.values({
				name: "Default Device",
			})
			.returning()
			.then((res) => res[0].id);

		await dbInstance
			.insert(schema.sessions)
			.values({ session, deviceId, expiresAt });

		setCookie(c, "session", session, {
			httpOnly: true,
			sameSite: "Lax",
			expires: expiresAt,
			path: "/",
		});

		return c.json({ message: "Authentication successful" });
	})
	.post("/api/light", authMiddleware, async (c) => {
		const body = await c.req.json();
		const res = await fetch(`${RASPBERRY_PI_URL}/api/light`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		return res;
	})
	.get("/api/aircon", authMiddleware, async (c) => {
		const res = await fetch(`${RASPBERRY_PI_URL}/api/aircon`);
		return res;
	})
	.post("/api/aircon", authMiddleware, async (c) => {
		const body = await c.req.json();
		const res = await fetch(`${RASPBERRY_PI_URL}/api/aircon`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		return res;
	})
	.get("/api/details", authMiddleware, async (c) => {
		const res = await fetch(`${RASPBERRY_PI_URL}/api/details`);
		const details = (await res.json()) as Details;
		return c.json(details);
	});

export type AppType = typeof routes;

export default {
	routes,
};

Bun.serve({
	fetch: app.fetch,
	port: 8787,
});
