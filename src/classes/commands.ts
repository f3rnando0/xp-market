import type { XP } from './xp';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Loggger } from './logger';

export class Commands {
	private xp: XP;
	private logger: Loggger;

	constructor(xp: XP, logger: Loggger) {
		this.xp = xp;
		this.logger = logger;
	}

	async bind() {
		const commands: Array<string> = [];
		this.logger.ok('binding commands');
		const commandFolder = readdirSync(
			join(__dirname, '..', 'app', 'commands'),
		).filter((file) => !file.endsWith('.ts'));

		for await (const category of commandFolder) {
			this.logger.ok(`binding events from category '${category}'`);
			const categoryFiles = readdirSync(
				join(__dirname, '..', 'app', 'commands', category),
			).filter((file) => file.endsWith('.ts'));
			for await (const file of categoryFiles) {
				const commandName = file.replace('.ts', '');
				this.logger.ok(
					`binding command -> category: '${category}' -> '${commandName}'`,
				);
				const command = await import(
					join(__dirname, '..', 'app', 'commands', category, file)
				);
				if (command.default?.data.name && command.default?.execute) {
					this.xp.commands.set(command.default.data.name, command.default);
					commands.push(command.default.data.toJSON());
					this.logger.ok(
						`binded command -> category: '${category}' -> '${commandName}'`,
					);
				} else {
					this.logger.error(`command '${commandName}' invalid`);
				}
			}
		}
		return commands;
	}
}
