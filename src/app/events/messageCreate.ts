import type { Client, Message } from 'discord.js';
import type { Loggger } from '../../classes/logger';

export default {
	name: 'messageCreate',
	description: 'Fires when a message is created',
	execute(logger: Loggger, client: Client, message: Message) {
		logger.ok('message create event binded');
	},
};
