import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const AppLayout = () => {
  return (
    <div className="h-screen ">
      <main className="container p-10">
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
