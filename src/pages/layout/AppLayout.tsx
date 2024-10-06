import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const AppLayout = () => {
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
