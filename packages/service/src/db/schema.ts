import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const devices = sqliteTable("devices", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
});

export const sessions = sqliteTable("sessions", {
	deviceId: integer("device_id")
		.notNull()
		.references(() => devices.id),
	session: text("id").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const devicesRelations = relations(devices, ({ many }) => ({
	sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	device: one(devices, {
		fields: [sessions.deviceId],
		references: [devices.id],
	}),
}));
