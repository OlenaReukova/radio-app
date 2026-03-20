export interface MiniPlayerControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  hasQueue?: boolean;
  stationId?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}
