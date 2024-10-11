import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useAuthStore } from "@/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { fetchUserInfo } from "@/service/AuthService";
import { useEffect } from "react";
import { getRoute } from "@/utils/utils";
import { RouteName } from "@/routes/types";

const AppLayout = () => {
  const navigate = useNavigate();
  const appRoute = getRoute(RouteName?.LandingPage);

  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    const onSub = onAuthStateChanged(auth, async (user) => {
      console.log("triggering",user?.uid);
      const isUser = await fetchUserInfo(user?.uid!);
      if (isUser) {
        setCurrentUser(isUser);
        navigate(appRoute?.path!);
      }
    });
    return () => {
      onSub();
    };
  }, [fetchUserInfo]);

  return (
    <div className="h-screen w-full flex flex-col">
      <main className="p-10 w-full flex flex-col h-5/6">
        <Header />
        <Outlet />
      </main>
      <div className="fixed bottom-0 w-full p-10 text-center bg-zinc-800 ">
        Shortify
      </div>
    </div>
  );
};
export default AppLayout;
