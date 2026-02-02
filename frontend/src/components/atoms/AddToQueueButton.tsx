import { ListPlus } from "lucide-react";
import { Button } from "../atoms/Button/Button";
import { Icon } from "./Icon";

interface AddToQueueButtonProps {
  active: boolean;
  onAddToQueue: () => void;
  disabled?: boolean;
  className?: string;
}

export function AddToQueueButton({
  active,
  onAddToQueue,
  disabled = false,
}: AddToQueueButtonProps) {
  return (
    <Button
      type="button"
      onClick={onAddToQueue}
      disabled={disabled}
      variant={active ? "active" : "glass"}
      size="md"
      arial-label="Add to queue"
    >
      <Icon icon={ListPlus} size="sm" state="muted" interactive />
    </Button>
  );
}
