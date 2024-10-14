import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useAuthStore } from "@/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { fetchUserInfo } from "@/service/AuthService";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    setIsLoading(true);
    const onSub = onAuthStateChanged(auth, async (user) => {
      try {
        const isUser = await fetchUserInfo(user?.uid!);
        if (isUser) {
          setCurrentUser(isUser);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    });
    return () => {
      onSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return;

  return (
    <div className="h-screen w-full flex flex-cols">
      <main className="p-10 w-full flex flex-col">
        <Header />
        <Outlet />
      </main>
      {/* <div className="fixed bottom-0 w-full p-10 text-center bg-zinc-800 ">
        Shortify
      </div> */}
    </div>
  );
};
export default AppLayout;
