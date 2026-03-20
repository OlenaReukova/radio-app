export interface VolumeControlProps {
  volume: number;
  onVolumeChange: (v: number) => void;
  orientation?: "horizontal" | "compact" | "popover";
}
