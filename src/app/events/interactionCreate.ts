import type { Interaction } from 'discord.js';
import type { Loggger } from '../../classes/logger';
import type { XP } from '../../classes/xp';

export default {
	name: 'interactionCreate',
	description: 'Fires when an interaction is created',
	async execute(logger: Loggger, xp: XP, interaction: Interaction) {
		logger.ok('interaction create event binded');

		if (!interaction.isChatInputCommand()) return;

		const command = (interaction.client as XP).commands.get(
			interaction.commandName,
		);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`,
			);
			return;
		}

		try {
			await command.execute(xp, interaction);
		} catch (error) {
			logger.error(error as string);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		}
	},
};
