import {
  Client,
  IntentsBitField,
  type BitFieldResolvable,
  type GatewayIntentsString,
} from "discord.js";
import { env } from "./env";
import { Events } from "./classes/events";
import { Loggger } from "./classes/logger";

const logger = new Loggger();

const run = async () => {
  const XP = new Client({
    intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
      GatewayIntentsString,
      number
    >,
  });

  await XP.login(env.DISCORD_TOKEN);
  const events = new Events(XP, logger);
  await events.bind();
};

run();
