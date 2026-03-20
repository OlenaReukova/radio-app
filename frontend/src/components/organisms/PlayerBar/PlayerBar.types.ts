import type { PlayerStatus, PlayerStation } from "../../../lib/player/radioPlayer.types";

export interface PlayerBarProps {
  status: PlayerStatus;
  station: PlayerStation | null;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (v: number) => void;
  onNext?: () => void;
  hasQueue?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onExpand?: () => void;
}
