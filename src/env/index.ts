import { z } from 'zod';

const envSchema = z.object({
	DISCORD_TOKEN: z.string(),
	DISCORD_GUILD_ID: z.string(),
	DISCORD_CLIENT_ID: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	throw new Error('Invalid invironmnent variables.');
}

export const env = _env.data;
