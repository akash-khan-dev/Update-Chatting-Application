import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../../Pages/Login";

export const LoginUser = () => {
  const users = useSelector((user) => user.login.login);
  return users ? <Outlet /> : <Login />;
};
