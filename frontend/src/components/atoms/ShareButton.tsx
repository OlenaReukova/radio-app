import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "../ui/utils";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  onShare: () => void;
  disabled?: boolean;
  className?: string;
}

export function ShareButton({
  onShare,
  disabled,
  className,
}: ShareButtonProps) {
  return (
    <Button
      type="button"
      onClick={onShare}
      disabled={disabled}
      variant="ghost"
      size="md"
      aria-label="Share station"
      className={cn(
        "flex items-center justify-center",
        "px-3 py-2.5",
        "rounded-xl border",
        "bg-white/5 border-white/10",
        "text-purple-200/70",
        "transition-all duration-200",
        "hover:bg-white/10 hover:border-purple-500/30 hover:scale-105",
        "active:scale-95",
        "focus-visible:outline-none focuse-visible:ring-2 focus-visible:ring-purple-500/50",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
    >
      <Icon icon={Share2} size="sm" state="muted" interactive />
    </Button>
  );
}
