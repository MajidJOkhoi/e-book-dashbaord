import { Outlet, Navigate } from "react-router-dom";
import useTokenStore from "@/store";

const AuthLayout = () => {
  // Check if the user is authenticated before rendering the children routes
  const token = useTokenStore((state) => state.token);

  // If the user is authenticated, redirect to the dashboard home page
  
  if (token) {
    return <Navigate to="/dashboard/home" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
