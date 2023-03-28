import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import { Login } from "./Pages/Login";
import { Registration } from "./Pages/Registration";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/registration" element={<Registration />}></Route>
        {/* <Route path="/login" element={<Login />}></Route> */}
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
