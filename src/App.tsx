import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/layout/AppLayout";
import { Routes } from "./routes/routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebaseConfig";
import { fetchUserInfo } from "./service/AuthService";
import { useAuthStore } from "./store/authStore";
import "./App.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: Routes,
  },
]);

function App() {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    const onSub = onAuthStateChanged(auth, async (user) => {
      const isUser = await fetchUserInfo(user?.uid!);
      if (isUser) {
        setCurrentUser(isUser);
      }
    });
    return () => {
      onSub();
    };
  }, [fetchUserInfo]);

  return <RouterProvider router={router} />;
}

export default App;
