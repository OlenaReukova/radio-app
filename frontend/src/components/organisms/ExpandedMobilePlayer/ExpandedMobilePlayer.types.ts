import type { PlayerStatus, PlayerStation } from "../../../lib/player/radioPlayer.types";

export interface ExpandedMobilePlayerProps {
  open: boolean;
  onClose: () => void;
  status: PlayerStatus;
  station: PlayerStation | null;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (v: number) => void;
  onNext?: () => void;
  hasQueue?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}
