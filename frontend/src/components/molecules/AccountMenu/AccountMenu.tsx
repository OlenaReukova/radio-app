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
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64
      bg-[#3A2F4A]
      border border-white/10
      rounded-xl
      shadow-2xl shadow-black/50
      overflow-hidden
      z-[110]"
        >
          <div className="px-4 py-3 border-b border-white/10 bg-white/5">
            <p className="text-white truncate">{user.name}</p>
            <p className="text-purple-300/60 text-sm truncate">{user.email}</p>
          </div>
          <div className="py-2">
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Listening Insights</MenuItem>
            <MenuItem>Subscription</MenuItem>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="
        w-full px-4 py-2.5
        text-left text-purple-200
        hover:bg-white/5 hover:text-white
        transition-all
      "
    >
      {children}
    </button>
  );
}
