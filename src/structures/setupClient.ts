import { botProperties, singleRequests } from "../Store";
import { setupSocket } from "./setupSocket";
import { makeRequest } from "../utilities/makeRequest";

export type Intent = "GUILDS";

export interface ClientOptions {
  intents?: "ALL" | Intent[];
  apiVersion?: number;
  gatewayVersion?: number;
  compress?: boolean;
  encoding?: "json" | "etf";
}

export const setupClient = (async (token: string, options: ClientOptions = {}): Promise<void> => {
  botProperties.token = token;
  botProperties.options = Object.assign({}, ({
    "intents": "ALL",
    "apiVersion": 6,
    "gatewayVersion": 6,
    "compress": false,
    "encoding": "json"
  }), options);

  const gatewayURL = await makeRequest("GET", "/gateway");

  singleRequests.gatewayURL = gatewayURL.url;

  await setupSocket(token);
});