import type { PlayerStatus } from "../../../lib/player/radioPlayer.types";

export interface PlayerBarProps {
  status: PlayerStatus;
  stationName: string | null;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
}
