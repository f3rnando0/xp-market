import type { Interaction, SlashCommandBuilder } from 'discord.js';
import type { XP } from '../xp';

export interface Command {
	data: SlashCommandBuilder;
	execute: (client: XP, interaction: Interaction) => Promise<K>;
}

export interface AdditionalProps {
	commands: Collection<unknown, Command>;
}
