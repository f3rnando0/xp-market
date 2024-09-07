import type { Loggger } from '../../classes/logger';
import type { XP } from '../../classes/xp';

export default {
	name: 'ready',
	description: 'Fires when XP is ready',
	async execute(logger: Loggger, xp: XP) {
		logger.ok('ready event binded');

		logger.ok(`'${xp.user?.displayName}#${xp.user?.discriminator}' started`);
	},
};
