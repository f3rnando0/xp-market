import type { XP } from './xp';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Loggger } from './logger';

export class Events {
	private xp: XP;
	private logger: Loggger;

	constructor(xp: XP, logger: Loggger) {
		this.xp = xp;
		this.logger = logger;
	}

	async bind() {
		this.logger.ok('binding events');
		const events = readdirSync(join(__dirname, '..', 'app', 'events')).filter(
			(file) => file.endsWith('.ts'),
		);
		for await (const event of events) {
			const cleanedEvent = event.replace('.ts', '');
			this.logger.ok(`binding event: '${cleanedEvent}'`);
			const eventFn = await import(
				join(__dirname, '..', 'app', 'events', event)
			);
			this.xp.on(cleanedEvent, (...args: unknown[]) => {
				if (!eventFn.default || !eventFn.default?.execute) {
					console.error(`event '${cleanedEvent}' invalid`);
					throw new Error(`event '${cleanedEvent}' invalid`);
				}

				return eventFn.default.execute(this.logger, this.xp, ...args);
			});
		}
	}
}
