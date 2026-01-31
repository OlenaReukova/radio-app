import { Play, Pause } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { GenreTagGroup } from "../atoms/GenreTagGroup";
import { FavoriteButton } from "../atoms/FavoriteButton";
import { AddToQueueButton } from "../atoms/AddToQueueButton";
import { ShareButton } from "../atoms/ShareButton";

interface StationCardProps {
  name: string;
  country: string;
  image: string;
  genres: string[];
  playing?: boolean;
  onPlay?: () => void;
  onFavorite?: () => void;
  onAddToQueue?: () => void;
  favorite: boolean;
  onShare?: () => void;
  active?: boolean;
}

export function StationCard({
  name,
  country,
  image,
  genres,
  playing,
  onPlay,
  onFavorite,
  favorite,
  onAddToQueue,
  onShare,
  active,
}: StationCardProps) {
  return (
    <Card
      className="
    group
    bg-white/5 backdrop-blur-sm
    border border-white/10
    rounded-2xl
    overflow-hidden
    transition-all duration-300
    hover:shadow-2xl hover:shadow-purple-500/20
    hover:scale-[1.02]
    hover:border-purple-500/30
  "
    >
      <div className="relative aspect-square overflow-hidden bg-black/40 ">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <button
          onClick={onPlay}
          aria-label={playing ? "Pause station" : "Play station"}
          className="
    absolute inset-0
    flex items-center justify-center
    bg-black/60
    opacity-0 group-hover:opacity-100
    transition-opacity
    duration-300
  "
        >
          <div
            className="
      w-16 h-16
      rounded-full
      flex items-center justify-center
      bg-gradient-to-br from-[#E054FF] to-[#935CFF]
      shadow-[0_0_20px_rgba(224,84,255,0.5)]
      hover:shadow-[0_0_30px_rgba(224,84,255,0.7)]
      hover:scale-110
      active:scale-95
      transition-all duration-300
    "
          >
            {playing ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 ml-0.5 text-white fill-current" />
            )}
          </div>
        </button>
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-white mb-1 truncate">{name}</h4>
            <p className="text-sm text-purple-200/70 ">{country}</p>
          </div>
        </div>

        <GenreTagGroup genres={genres} />
        <div className="mt-4 grid grid-cols-3 gap-3">
          <FavoriteButton
            active={!!favorite}
            onToggle={onFavorite ?? (() => {})}
          />
          <AddToQueueButton
            active={!!active}
            onAddToQueue={onAddToQueue ?? (() => {})}
          />
          <ShareButton active={!!active} onShare={onShare ?? (() => {})} />
        </div>
      </CardContent>
    </Card>
  );
}
