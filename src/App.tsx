import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./pages/layout/AppLayout";
import { Routes } from "./routes/routes";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: Routes,
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
