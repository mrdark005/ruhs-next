import WebSocket from "ws";

import { ClientOptions } from "./structures/setupClient";

export interface EventHandlers {
  ready?: (() => Promise<void> | void);
}

export let botProperties = ({
  "token": "",
  "options": {} as Required<ClientOptions>,
  "ws": null as null | WebSocket
});

export let cache = ({
  "guilds": new Map(),
  "channels": new Map()
});

export let singleRequests = ({
  "gatewayURL": ""
});

export let eventHandlers: EventHandlers = {};