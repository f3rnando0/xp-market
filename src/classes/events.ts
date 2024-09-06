import type { Client } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Loggger } from "./logger";

export class Events {
  private client: Client;
  private logger: Loggger;

  constructor(client: Client, logger: Loggger) {
    this.client = client;
    this.logger = logger;
  }

  async bind() {
    this.logger.ok("binding events");
    const events = readdirSync(join(__dirname, "..", "events")).filter((file) =>
      file.endsWith(".ts")
    );
    for await (const event of events) {
      const cleanedEvent = event.replace(".ts", "");
      this.logger.ok(`binding event: '${cleanedEvent}'`);
      const eventFn = await import(join(__dirname, "..", "events", event));
      this.client.on(cleanedEvent, (...args: any[]) => {
        if (!eventFn.default || !eventFn.default?.execute) {
          console.error(`event '${cleanedEvent}' invalid`);
          throw new Error(`event '${cleanedEvent}' invalid`);
        }

        return eventFn.default.execute(...args);
      });
    }
  }
}
