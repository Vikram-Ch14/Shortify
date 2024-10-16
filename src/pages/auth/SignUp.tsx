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
import { useEffect, useState } from "react";
import { CreateUser } from "./types";
import { createUserAcc, userData } from "@/service/AuthService";
import { getRoute } from "@/utils/utils";
import { RouteName } from "@/routes/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [createUser, setCreateUser] = useState<CreateUser>({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const getLoginRoute = getRoute(RouteName?.Login);

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setCreateUser((prev: CreateUser) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleCreate = async () => {
    setIsLoading(true);
    if (
      createUser?.email?.length &&
      createUser?.username?.length &&
      createUser?.password?.length
    ) {
      try {
        const user = await createUserAcc(
          createUser?.email,
          createUser?.password
        );
        setUserId(user?.user?.uid);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
  };

  const navigateToLogin = () => {
    const getNavPath = getLoginRoute?.path;
    navigate(getNavPath!);
  };

  useEffect(() => {
    if (!userId?.length) return;

    const persistData = async () => {
      const { username, email } = createUser;

      try {
        await userData(userId, username, email);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    persistData();
  }, [userId]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center justify-center flex-1">
        <Card className="w-96 max-w-screen-md">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription className="text-white">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">User Name</Label>
                  <Input
                    id="first-name"
                    placeholder="UserName"
                    required
                    type="text"
                    name="username"
                    value={createUser?.username ?? ""}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={createUser?.email ?? ""}
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={createUser?.password ?? ""}
                  onChange={onChange}
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleCreate}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <span className="cursor-pointer" onClick={navigateToLogin}>
                Sign In
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
