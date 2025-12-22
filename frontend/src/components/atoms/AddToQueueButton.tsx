import { ListPlus } from "lucide-react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "../ui/utils";

interface AddToQueueButtonProps {
  onAddToQueue: () => void;
  disabled?: boolean;
  className?: string;
}

export function AddToQueueButton({
  onAddToQueue,
  disabled = false,
  className,
}: AddToQueueButtonProps) {
  return (
    <Button
      type="button"
      onClick={onAddToQueue}
      disabled={disabled}
      variant="ghost"
      size="md"
      arial-label="Add to queue"
      title="Add to queue"
      className={cn(
        //Icon Butttton (Glass)
        "flex items-center justify-center",
        "px-3 py-2.5",
        "rounded-xl border",
        "bg-white/5 border-white/10",
        "text-purple-200/70",
        "transition-all duration-200",
        //Hover state
        "hover:bg-white/10 hover:border-purple-500/30 hover:scale-105",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
    >
      <Icon icon={ListPlus} size="sm" state="muted" interactive />
    </Button>
  );
}
