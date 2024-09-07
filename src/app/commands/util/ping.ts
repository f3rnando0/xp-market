import { SlashCommandBuilder, type Interaction } from 'discord.js';
import type { XP } from '../../../classes/xp';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`Returns XP Market's ping`),
	async execute(xp: XP, interaction: Interaction) {
		if (interaction.isChatInputCommand()) {
			await interaction.reply('pong!');
			return;
		}
	},
};
