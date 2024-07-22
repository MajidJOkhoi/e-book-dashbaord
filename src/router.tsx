import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashboardLayout";
import BookPage from "./pages/BookPage";
import AuthLayout from "./layout/AuthLayout";
import CreateBookPage from "./pages/CreateBookPage";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "books", element: <BookPage /> },
      { path: "books/create", element: <CreateBookPage /> },
      { path: "books/edit/:id", element: <EditBook /> },
      { path: "books/delete/:id", element: <DeleteBook /> },  
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
