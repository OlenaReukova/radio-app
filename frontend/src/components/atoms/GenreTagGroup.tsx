import { Button } from "../atoms/Button/Button";

interface GenreTagGroupProps {
  genres: string[];
  variant?: "tags" | "inline";
}

export function GenreTagGroup({ genres, variant = "tags" }: GenreTagGroupProps) {
  if (variant === "inline") {
    return (
      <span className="truncate">
        {genres.join(" • ")}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <Button key={genre} variant="glass" size="xs" className="tag-genre">
          {genre}
        </Button>
      ))}
    </div>
  );
}
