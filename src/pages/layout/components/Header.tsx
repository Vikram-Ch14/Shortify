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
import { RouteName } from "@/routes/types";
import { getRoute } from "@/utils/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Link, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const isUserLogin = false;

  const loginRoute = getRoute(RouteName?.Login);
  const signUpRoute = getRoute(RouteName?.SignUp);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogin = () => {
    const getNavPath = loginRoute?.path;
    navigate(getNavPath!);
  };

  return (
    <div className="flex items-center justify-between">
      <div></div>
      <div>
        {location?.pathname !== loginRoute?.path &&
        location?.pathname !== signUpRoute?.path ? (
          !isUserLogin ? (
            <Button onClick={navigateToLogin}>Login</Button>
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
                  <Link className="mr-2" height={15} width={15} />
                  <span>Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2" height={15} width={15} />
                  <span>LogOut</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Header;
