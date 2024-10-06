import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Link, LogOut } from "lucide-react";

const Header = () => {
  const isUserLogin = false;

  return (
    <div className="flex items-center justify-between">
      <div>
      </div>
      <div>
        {isUserLogin ? (
          <Button>logout</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>OK</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>New Saturday</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
              <Link className="mr-2" height={15} width={15}/>
                <span>Links</span>
                </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut className="mr-2" height={15} width={15}/>
                <span>LogOut</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
