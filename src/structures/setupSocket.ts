import WebSocket from "ws";
import { botProperties, singleRequests, cache, eventHandlers } from "../Store";

let pack: (data: Record<string, unknown>) => Buffer | string;
let unpack: (data: WebSocket.Data | any) => ({
  op: number;
  d: any;
  s?: number;
  t?: string;
});

export const setupSocket = (async (token: string) => {
  if (botProperties.options.encoding === "etf") {
    try {
      const erlpack = require("erlpack");

      pack = erlpack.pack;
      unpack = erlpack.unpack;
    } catch (error) {
      throw new Error("\"erlpack\" node package must be installed when \"options.encoding\" is \"etf\"");
    }
  } else {
    pack = JSON.stringify;
    unpack = JSON.parse;
  }

  botProperties.ws = new WebSocket(`${singleRequests.gatewayURL}/?v=${botProperties.options.gatewayVersion}&encoding=${botProperties.options.encoding}${botProperties.options.compress ? "&compress=zlib-stream" : ""}`);

  let lastSequence: null | number = null;

  botProperties.ws.on("message", async (data) => {
    const result = unpack(data);

    if (result.op === 10) {
      setInterval(() => {
        botProperties.ws?.send(pack({
          "op": 1,
          "d": lastSequence
        }));
      }, result.d.heartbeat_interval);

      botProperties.ws?.send(pack({
        "op": 2,
        "d": {
          "token": token,
          "properties": {
            "$os": process.platform,
            "$browser": "ruhs (http://example.com)",
            "$device": "ruhs (http://example.com)"
          }
        }
      }));
    } else if (result.op === 0) {
      if (result.t === "READY") {
        if (eventHandlers.ready) {
          await eventHandlers.ready();
        }
      }
    }
  });
});