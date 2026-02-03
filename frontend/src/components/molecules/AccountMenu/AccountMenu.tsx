import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../../atoms/Button";

interface AccountMenuProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function AccountMenu({ user }: AccountMenuProps) {
  return (
    <Button type="button" variant="avatar" aria-label="Account menu">
      <Avatar className="w-full h-full">
        <AvatarFallback className="bg-transparent text-white">
          {user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}
