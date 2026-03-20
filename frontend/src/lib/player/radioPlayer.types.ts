//this a contract between logic and UI
export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "error";

export type PlayerStation = {
  stationuuid: string;
  name: string;
  country: string;
  favicon?: string;
  genres: string[];
  url_resolved: string;
};
