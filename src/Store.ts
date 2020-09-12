import WebSocket from "ws";

import Collection from "./utilities/Collection";
import { ClientOptions } from "./structures/setupClient";
import { Guild } from "./structures/setupGuild";

export interface EventHandlers {
  ready?: (() => Promise<void> | void);
  guildCreate?: ((guild: Guild) => Promise<void> | void);
  guildCache?: ((guild: Guild) => Promise<void> | void);
}

export let botProperties = ({
  "token": "",
  "options": {} as Required<ClientOptions>,
  "ws": null as null | WebSocket
});

export let cache = ({
  "guilds": new Collection<Guild>(),
  "channels": new Collection()
});

export let singleRequests = ({
  "gatewayURL": ""
});

export let eventHandlers: EventHandlers = {};
