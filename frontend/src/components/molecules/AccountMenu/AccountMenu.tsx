import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../../atoms/Button";
import { useState } from "react";

interface AccountMenuProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function AccountMenu({ user }: AccountMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        type="button"
        variant="avatar"
        aria-label="Account menu"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar className="w-full h-full">
          <AvatarFallback className="bg-transparent text-white">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Button>
      {open && <div className="absolute right-0 mt-2 w-64"></div>}
    </div>
  );
}
