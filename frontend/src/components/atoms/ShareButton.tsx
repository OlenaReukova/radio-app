import { Button } from "../atoms/Button/Button";
import { Icon } from "./Icon";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  active: boolean;
  onShare: () => void;
  disabled?: boolean;
  className?: string;
}

export function ShareButton({ onShare, disabled, active }: ShareButtonProps) {
  return (
    <Button
      type="button"
      onClick={onShare}
      disabled={disabled}
      variant={active ? "active" : "glass"}
      size="md"
      aria-label="Share station"
    >
      <Icon icon={Share2} size="sm" state="muted" interactive />
    </Button>
  );
}
