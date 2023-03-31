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
import { RootLayOut } from "./RootLayOut";
import About from "./Pages/About/About";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoginUser />}>
          <Route element={<RootLayOut />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
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
