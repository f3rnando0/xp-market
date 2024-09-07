import type { Loggger } from './logger';
import { REST, Routes } from 'discord.js';

export class Rest {
	private token;
	private clientId;
	private guildId;
	private logger;
	private commandArray: string[];

	constructor(
		logger: Loggger,
		token: string,
		clientId: string,
		guildId: string,
		commandArray: string[],
	) {
		this.token = token;
		this.clientId = clientId;
		this.guildId = guildId;
		this.logger = logger;
		this.commandArray = commandArray;
	}

	async register() {
		try {
			const rest = new REST().setToken(this.token);

			this.logger.ok('registering slash (/) commands');

			await rest.put(
				Routes.applicationGuildCommands(this.clientId, this.guildId),
				{ body: this.commandArray },
			);

			this.logger.ok('registered slash (/) commands');
		} catch (error) {
			this.logger.error(error as string);
		}
	}
}
