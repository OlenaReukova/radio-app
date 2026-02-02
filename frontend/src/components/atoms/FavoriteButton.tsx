import { Heart } from "lucide-react";
import { Button } from "../atoms/Button/Button";
import { Icon } from "./Icon";

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  className?: string;
}

export function FavoriteButton({ active, onToggle }: FavoriteButtonProps) {
  return (
    <Button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      variant={active ? "active" : "glass"}
      size="md"
    >
      <Icon
        icon={Heart}
        size="md"
        state={active ? "active" : "muted"}
        interactive
        className={active ? "fill-current" : undefined}
      />
    </Button>
  );
}
