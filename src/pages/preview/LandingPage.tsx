import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RouteName } from "@/routes/types";
import { useAuthStore } from "@/store/authStore";
import { getRoute } from "@/utils/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [url, setUrl] = useState<string>("");
  const currentUser = useAuthStore((state) => state?.currentUser);

  const loginRoute = getRoute(RouteName.Login);
  const dashboardRoute = getRoute(RouteName?.DashBoardPage);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e?.target?.value);
  };

  const handleShortenUrl = () => {
    if (url) {
      const getNavPath = !currentUser?.id?.length
        ? loginRoute?.getRoutePath!({
            url: url,
          })
        : dashboardRoute?.getRoutePath({
            url: url,
          });
      navigate(getNavPath!);
    }
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <h2 className="my-10 text-2xl sm:text-3xl lg:text-5xl text-white text-center sm:my-16 font-extrabold">
        URL Shortner
      </h2>
      <div className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 items-center gap-2 ">
        <Input
          className="h-12"
          placeholder="Enter Your URL..."
          value={url}
          onChange={onChange}
        />
        {/* variant={"destructive"} */}
        <Button
          className="bg-green-500 text-black hover:bg-red-800 hover:text-white"
          onClick={handleShortenUrl}
        >
          Shorten Url!
        </Button>
      </div>
    </div>
  );
};
export default LandingPage;
