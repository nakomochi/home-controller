function getEnv(key: string): string {
	const val = process.env[key];
	if (val === undefined || val.trim() === "") {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return val;
}

export const RASPBERRY_PI_URL = getEnv("RASPBERRY_PI_URL");
export const SECRET = Bun.password.hash(getEnv("SECRET"));
export const SITE_URL = getEnv("SITE_URL");
