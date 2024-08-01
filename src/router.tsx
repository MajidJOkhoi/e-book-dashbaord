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
import ManageProject from "./pages/manageproject/ManageProject";
import CreateProject from "./pages/manageproject/CreateProject";
import AddUser from "./pages/manageuser/AddUser";
import ManageLeave from "./pages/manageleave/ManageLeave";
import CheckPerformance from "./pages/CheckPerformance";
import ManageTeam from "./pages/manageuser/ManageTeam";
import ManageAttendece from "./pages/manageattendece/ManageAttendence";

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

      // Manage Project Routes
      { path: "projects", element: <ManageProject /> },
      { path: "projects/create", element: <CreateProject /> },

      // Manage Team Routes
      { path: "team", element: <ManageTeam /> },
      { path: "team/create", element: <AddUser /> },

      // Manage Leave, Performance, and Attendance Routes
      { path: "leaves", element: <ManageLeave /> },
      { path: "performance", element: <CheckPerformance /> },
      { path: "attendence", element: <ManageAttendece/> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

export default router;