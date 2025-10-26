import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const devices = sqliteTable("devices", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	type: text("type"),
});

export const sessions = sqliteTable("session", {
	deviceId: integer("device_id").notNull(),
	token: text("token").notNull(),
});

export const sessionRelations = relations(sessions, ({ one }) => ({
	sessions: one(devices, {
		fields: [sessions.deviceId],
		references: [devices.id],
	}),
}));
