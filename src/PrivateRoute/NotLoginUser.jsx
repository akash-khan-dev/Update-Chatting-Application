import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const NotLogInUser = () => {
  const users = useSelector((user) => user.login.login);
  return users ? Navigate("/") : <Outlet />;
};
