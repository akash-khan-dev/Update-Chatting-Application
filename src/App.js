import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Forgot } from "./Pages/ForgotPassword";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";

import { Registration } from "./Pages/Registration";
import { LoginUser } from "./PrivateRoute/LoginUser/LoginUser";
import { NotLogInUser } from "./PrivateRoute/NotLoginUser";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoginUser />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route element={<NotLogInUser />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
