import { PlayerBarProps } from "./PlayerBar.types";
export function PlayerBar({
  status,
  stationName,
  onPlayPause,
  volume,
  onVolumeChange,
}: PlayerBarProps) {
  return (
    <div>
      <span>{stationName}</span>

      <button onClick={onPlayPause}>
        {status === "playing" ? "Pause" : "Play"}
      </button>

      <input
        type="range"
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
      />
    </div>
  );
}
