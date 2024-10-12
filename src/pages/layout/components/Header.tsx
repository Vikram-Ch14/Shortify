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
import { auth } from "@/lib/firebaseConfig";
import { RouteName } from "@/routes/types";
import { useAuthStore } from "@/store/authStore";
import { getRoute } from "@/utils/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Link, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginRoute = getRoute(RouteName?.Login);
  const signUpRoute = getRoute(RouteName?.SignUp);
  const appRoute = getRoute(RouteName?.LandingPage)

  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const navigateToLogin = () => {
    const getNavPath = loginRoute?.path;
    navigate(getNavPath!);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    auth?.signOut();
    navigate(appRoute?.path!)
  };

  return (
    <div className="flex items-center justify-between">
      <div></div>
      <div>
        {location?.pathname !== loginRoute?.path &&
        location?.pathname !== signUpRoute?.path ? (
          !currentUser?.id ? (
            <Button onClick={navigateToLogin}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{currentUser?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link className="mr-2" height={15} width={15} />
                  <span>Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-400"
                  onClick={handleLogout}
                >
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
