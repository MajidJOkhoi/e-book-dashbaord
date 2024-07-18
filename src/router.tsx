import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
      { path: "home", element: <Home /> },
    ],
  },

  {
    path: "/login", 
    element: <LoginPage />,
  },
  {
    path: "/register", 
    element: <RegisterPage />,
  },
]);

export default router;
