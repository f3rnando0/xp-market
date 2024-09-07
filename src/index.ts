import { env } from './env';
import { Events } from './classes/events';
import { Loggger } from './classes/logger';
import { XP } from './classes/xp';
import { Commands } from './classes/commands';
import { Rest } from './classes/rest';

const logger = new Loggger();

const run = async () => {
	const xp = new XP();

	await xp.login(env.DISCORD_TOKEN);
	const events = new Events(xp, logger);
	await events.bind();
	const commands = new Commands(xp, logger);
	const commandsArray = await commands.bind();

	if (commandsArray) {
		const rest = new Rest(
			logger,
			env.DISCORD_TOKEN,
			env.DISCORD_CLIENT_ID,
			env.DISCORD_GUILD_ID,
			commandsArray,
		);

		await rest.register();
	}
};

run();
