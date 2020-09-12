export type Region = "europe" | "russia";

export interface InGuildData {
  name: string;
  region: GuildRegion;
}

export interface OutGuildData {
  id: string;
  name: string;
  region: GuildRegion;
}

export interface Guild {
  id: string;
  name: string;
  region: GuildRegion;
}

export interface const setupGuild = ((data: OutGuildData) => {
  const guild = data;
});
