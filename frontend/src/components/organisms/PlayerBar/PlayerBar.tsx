import { PlayerBarProps } from "./PlayerBar.types";

//player bar is following figma ui. No audio logic inside the component
//layout-level UI
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
