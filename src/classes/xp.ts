import {
	Client,
	Collection,
	IntentsBitField,
	type BitFieldResolvable,
	type GatewayIntentsString,
} from 'discord.js';
import type { AdditionalProps, Command } from './types/index';

export class XP extends Client implements AdditionalProps {
	public commands: Collection<unknown, Command>;

	constructor() {
		super({
			intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
				GatewayIntentsString,
				number
			>,
		});
		this.commands = new Collection();
	}
}
