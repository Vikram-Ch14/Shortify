import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UserDetails } from "./types";
import { loginUser } from "@/service/AuthService";
import { getRoute } from "@/utils/utils";
import { RouteName } from "@/routes/types";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    password: "",
  });
  const signUpRoute = getRoute(RouteName?.SignUp);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e?.target;
    setUserDetails((prev: UserDetails) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const handleLogin = async () => {
    if (userDetails?.email?.length && userDetails?.password?.length) {
      try {
        await loginUser(userDetails?.email, userDetails?.password);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const navigateToSignUp = () => {
    const getNavPath = signUpRoute?.path;
    navigate(getNavPath!);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center justify-center flex-1">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription className="text-white">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="enter your email..."
                  required
                  value={userDetails?.email}
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="enter your password..."
                  onChange={onChange}
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm ">
              Don&apos;t have an account?{" "}
              <span className="cursor-pointer" onClick={navigateToSignUp}>
                Sign up
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
